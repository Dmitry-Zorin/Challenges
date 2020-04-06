import React, { PureComponent } from 'react'
import axios from 'axios'
import { Router } from '@reach/router'
import { Layout } from './Layout'
import { Login } from '../scenes/Login'
import { Auth } from './Auth'
import { NotFoundPage } from '../scenes/404'
import { DataContext } from '../services/contexts/DataContext'
import { Dashboard } from '../scenes/Dashboard'
import { Challenge } from '../scenes/Challenge'
import { ChallengeGroupExtended } from '../scenes/ChallengeGroupExtended'
import { challengesQuery, handleError, updateTime } from '../services'

export default class App extends PureComponent {
	constructor(props) {
		super(props)
		this.toggleSpinner = this.toggleSpinner.bind(this)
		this.updateChallenges = this.updateChallenges.bind(this)
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)

		this.state = {
			...DataContext._currentValue,
			challenges: {},
			spinnerIsVisible: false,
			showSpinner: () => this.toggleSpinner(true),
			hideSpinner: () => this.toggleSpinner(false),
			update: this.updateChallenges,
		}
	}

	componentDidMount() {
		axios.post(
			this.state.apiServer,
			{ query: `{ user { user ${challengesQuery} } }` },
			{ withCredentials: true },
		)
			.then(({ data: { data } }) => {
				const user = data.user.user
				user ? this.login(user) : this.logout()
			})
			.catch(err => {
				handleError(err, 'Failed to update challenges')
			})
			.finally(this.state.hideSpinner)

		// Timeout for the mobile devices
		setTimeout(() => {
			this.setState({
				spinnerIsVisible: true,
				challenges: JSON.parse(
					localStorage.getItem('challenges'),
				) || {},
			})
		}, 0)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	toggleSpinner(spinnerIsVisible) {
		this.setState({ spinnerIsVisible })
	}

	async updateChallenges(challenges, isAuthorized = true) {
		challenges = await updateTime(
			challenges || this.state.challenges,
			this.state.apiServer,
		)
		this.setState({ challenges, isAuthorized })
	}

	login(user) {
		this.interval = setInterval(this.updateChallenges, 15000)
		this.updateChallenges(user.challenges, true)
	}

	logout() {
		clearInterval(this.interval)
		this.setState({
			challenges: {},
			isAuthorized: false,
		})
	}

	render = () => (
		<DataContext.Provider value={this.state}>
			<Router primary={false}>
				<Layout path='/'>
					<NotFoundPage default/>
					<Dashboard path='/'/>
					<Login path='login' login={this.login} logout={this.logout}/>
					<Auth path='create' Component={Challenge}/>
					<Auth path='edit' Component={Challenge}/>
					<ChallengeGroupExtended path='ongoing'/>
					<ChallengeGroupExtended path='upcoming'/>
					<ChallengeGroupExtended path='completed'/>
				</Layout>
			</Router>
		</DataContext.Provider>
	)
}
