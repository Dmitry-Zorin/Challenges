import React, { PureComponent } from 'react'
import axios from 'axios'
import { Form } from 'uikit-react'
import { InnerLayout } from 'components/InnerLayout'
import { addNotification, challengesQuery, handleError } from 'services'
import { DataContext } from 'contexts/DataContext'
import notifications from 'data/notifications'
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
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
		this.state = states.login
	}
	
	componentDidMount() {
		if (this.context.isAuthorized)
			this.logout()
	}
	
	handleChange(name, value) {
		this.setState({ [name]: value })
	}
	
	login() {
		const data = {
			query: `mutation(
		    $username: String!
		    $password: String!
		  ) {
		    ${this.state.action}(
		      username: $username
		      password: $password
		    ) {
		      user ${challengesQuery} 
		    }
		  }`,
			variables: {
				username: this.state.username,
				password: this.state.password,
			},
		}
		
		this.context.showSpinner()
		axios.post(this.context.apiServer, data, { withCredentials: true })
			.then(({ data: { data } }) => {
				const user = data[this.state.action].user
				if (!user) {
					return addNotification(
						this.state.action === 'login'
							? notifications.loginFailed
							: notifications.signUpFailed,
					)
				}
				this.props.login(user)
				this.props.navigate('/')
			})
			.catch(err => {
				handleError(err, `Failed to ${this.state.title.toLowerCase()}`)
			})
			.finally(this.context.hideSpinner)
	}
	
	logout() {
		this.context.showSpinner()
		axios.post(
			this.context.apiServer,
			{ query: 'mutation { logout { user { username } } }' },
			{ withCredentials: true },
		)
			.then(() => {
				localStorage.clear()
				this.props.logout()
			})
			.catch(err => handleError(err, 'Failed to log out'))
			.finally(this.context.hideSpinner)
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
				<SwitcherItem
					icon={states.login.icon}
					value={states.login.title}
					active={this.state.action === 'login'}
					onClick={() => this.setState(states.login)}
				/>
				<SwitcherItem
					icon={states.signUp.icon}
					value={states.signUp.title}
					active={this.state.action === 'signUp'}
					onClick={() => this.setState(states.signUp)}
				/>
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
					onClick={this.login}
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
