import React, { PureComponent } from 'react'
import axios from 'axios'
import { Form } from 'uikit-react'
import { InnerLayout } from '../../components/InnerLayout'
import {
	addNotification,
	challengesQuery,
	handleError,
} from '../../services/helper'
import { DataContext } from '../../services/contexts/DataContext'
import { notifications } from '../../services/data/notifications'
import { SwitcherItem } from '../../components/SwitcherItem'
import { TextInput } from '../../components/TextInput'

const states = {
	login: {
		action: 'login',
		title: 'Log In',
	},
	signUp: {
		action: 'signUp',
		title: 'Sign Up',
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
		      user { 
		        ${challengesQuery} 
		      } 
		    }
		  }`,
			variables: {
				username: this.state.username,
				password: this.state.password,
			},
		}

		axios.post(this.context.apiServer, data, { withCredentials: true })
			.then(({ data: { data } }) => {
				const user = data[this.state.action].user

				if (!user)
					return addNotification(
						this.state.action === 'login'
							? notifications.loginFailed
							: notifications.error,
					)

				this.props.login(user)
				this.props.navigate('/')
			})
			.catch(err => {
				handleError(err, `Failed to ${this.state.title.toLowerCase()}`)
			})
	}

	logout() {
		axios.post(
			this.context.apiServer,
			{ query: 'mutation { logout { user { username } } }' },
			{ withCredentials: true },
		)
			.then(this.props.logout)
			.catch(err => handleError(err, 'Failed to log out'))
	}

	render = () => (
		<InnerLayout>
			<p className='uk-h2 uk-text-center'>
				{this.state.title}
			</p>
			<ul className={`
				uk-subnav
				uk-subnav-pill
				uk-flex-center
				uk-child-width-1-2
				uk-child-width-1-3@m
			`}>
				<SwitcherItem
					value={states.login.title}
					active={this.state.action === 'login'}
					onClick={() => this.setState(states.login)}
				/>
				<SwitcherItem
					value={states.signUp.title}
					active={this.state.action === 'signUp'}
					onClick={() => this.setState(states.signUp)}
				/>
			</ul>
			<Form>
				<TextInput
					label='Username'
					value={this.state.username}
					handleChange={this.handleChange}
				/>
				<TextInput
					label='Password'
					value={this.state.password}
					handleChange={this.handleChange}
					isPassword={true}
				/>
				<button
					className='uk-button uk-align-center uk-width-1-3@m uk-width-1-2@s'
					onClick={this.login}
				>
					{this.state.title}
				</button>
			</Form>
		</InnerLayout>
	)
}
