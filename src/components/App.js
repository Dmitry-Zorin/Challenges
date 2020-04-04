import React, { PureComponent } from 'react'
import { Router } from '@reach/router'
import { Layout } from './Layout'
import { Login } from '../scenes/Login'
import { Auth } from './Auth'
import { NotFoundPage } from '../scenes/404'
import { DataContext } from '../services/contexts/DataContext'
import { Dashboard } from '../scenes/Dashboard'
import { Challenge } from '../scenes/Challenge'
import { ChallengeGroupExtended } from '../scenes/ChallengeGroupExtended'
import {
	challengesQuery,
	handleError,
	sortChallenges,
	updateTime,
} from '../services/helper'
import axios from 'axios'

export default class App extends PureComponent {
	constructor(props) {
		super(props)
		this.toggleSpinner = this.toggleSpinner.bind(this)
		this.updateChallenges = this.updateChallenges.bind(this)
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)

		this.state = {
			...DataContext._currentValue,
			spinnerIsShown: true,
			showSpinner: () => this.toggleSpinner(true),
			hideSpinner: () => this.toggleSpinner(false),
			challenges: {},
			update: this.updateChallenges,
		}
	}

	componentDidMount() {
		const challenges = JSON.parse(
			localStorage.getItem('challenges'),
		)
		if (challenges)
			this.setState({ challenges, isAuthorized: true })

		axios.post(
			this.state.apiServer,
			{ query: `{ user { user { ${challengesQuery} } } }` },
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
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	toggleSpinner(spinnerIsShown) {
		this.setState({ spinnerIsShown })
	}

	async updateChallenges(challenges, isAuthorized = true) {
		challenges = await updateTime(
			challenges
				? sortChallenges(challenges)
				: this.state.challenges,
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
