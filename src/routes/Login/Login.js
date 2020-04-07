import React, { PureComponent } from 'react'
import { Form } from 'uikit-react'
import { InnerLayout } from 'components/InnerLayout'
import { addNotification } from 'scripts/utils'
import { DataContext } from 'contexts/DataContext'
import error from 'data/notifications/error'
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
import { authorize, logout } from 'scripts/services'

const states = {
	login: {
		action: 'login',
		title: 'Log in',
		icon: faSignInAlt,
	},
	signUp: {
		action: 'signUp',
		title: 'Sign up',
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
		authorize(this.context, action, { username, password })
			.then(({ user }) => {
				if (!user) return addNotification(error[action])
				
				this.props.login(user)
				this.props.navigate('/')
			})
	}
	
	logout() {
		logout(this.context).then(() => {
			localStorage.clear()
			this.props.logout()
		})
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
					label='Username'
					value={this.state.username}
					handleChange={this.handleChange}
				/>
				<TextInput
					icon={faLock}
					label='Password'
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
