import React, { PureComponent } from 'react'
import { Form } from 'uikit-react'
import { InnerLayout } from 'components/InnerLayout'
import { DataContext } from 'contexts/DataContext'
import { SwitcherItem } from 'components/SwitcherItem'
import { TextInput } from 'components/TextInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faLock,
	faPaperPlane,
	faSignInAlt,
	faUser,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { authorize, logout } from 'scripts/requests'
import { addNotification } from 'scripts/utils'
import errors from 'data/notifications/errors.json'

const states = {
	login: {
		action: 'login',
		title: 'log in',
		icon: faSignInAlt,
	},
	signUp: {
		action: 'signUp',
		title: 'sign up',
		icon: faUserPlus,
	},
}

export class Login extends PureComponent {
	static contextType = DataContext
	
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.authorize = this.authorize.bind(this)
		this.logout = this.logout.bind(this)
		this.state = states.login
	}
	
	componentDidMount() {
		if (this.context.userIsAuthorized) this.logout()
	}
	
	handleChange(name, value) {
		this.setState({ [name]: value })
	}
	
	authorize() {
		const { action, username, password } = this.state
		!username || !password ? addNotification(errors.invalid)
			: authorize(this.context, action, { username, password })
				.then(user => {
					if (!user) return
					this.props.login(user)
					this.props.navigate('/')
				})
				.catch(() => {})
	}
	
	logout() {
		logout(this.context)
			.then(() => {
				localStorage.clear()
				this.props.logout()
			})
			.catch(() => {})
	}
	
	render = () => (
		<InnerLayout>
			<ul style={{ marginTop: '1.5em' }} className={`
				uk-subnav
				uk-subnav-pill
				uk-flex-center
				uk-child-width-1-2
				uk-child-width-1-3@m
			`}>
				{['login', 'signUp'].map(a => (
					<SwitcherItem
						key={a}
						icon={states[a].icon}
						value={states[a].title}
						active={this.state.action === a}
						onClick={() => this.setState(states[a])}
					/>
				))}
			</ul>
			<Form className='uk-margin-medium-top'>
				<TextInput
					icon={faUser}
					label='username'
					value={this.state.username}
					handleChange={this.handleChange}
				/>
				<TextInput
					icon={faLock}
					label='password'
					value={this.state.password}
					handleChange={this.handleChange}
					isPassword={true}
				/>
				<button
					className='uk-button uk-align-center uk-width-1-3@m uk-width-1-2@s'
					style={{ marginTop: '4em' }}
					onClick={this.authorize}
				>
					<FontAwesomeIcon
						icon={faPaperPlane}
						className='icon-left-2'
						transform='shrink-2'
					/>
					Submit
				</button>
			</Form>
		</InnerLayout>
	)
}
