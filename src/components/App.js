import React, { PureComponent } from 'react'
import axios from 'axios'
import { Router } from '@reach/router'
import { Layout } from './layout'
import { Login } from '../scenes/login'
import { Auth } from './Auth'
import { NotFoundPage } from '../scenes/404'
import { DataContext } from '../services/contexts/DataContext'
import { Dashboard } from '../scenes/dashboard'
import { Challenge } from '../scenes/challenge'
import { ChallengeGroupExtended } from '../scenes/challenge-group-extended'
import { getChallenges, handleError, updateTime } from '../services/helper'

export default class App extends PureComponent {
	constructor(props) {
		super(props)
		this.updateChallenges = this.updateChallenges.bind(this)
		this.updateState = this.updateState.bind(this)
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)

		this.state = {
			...DataContext._currentValue,
			challenges: {},
			updateChallenges: this.updateChallenges,
		}
		this.authPromise = axios.post(
			this.state.apiServer,
			{ query: '{ user { isAuthorized } }' },
			{ withCredentials: true },
		)
	}

	componentDidMount() {
		this.authPromise
			.then(res => {
				res.data.data.user.isAuthorized
					? this.login(true)
					: this.logout()
			})
			.catch(err => {
				handleError(err, 'Failed to check user authorization')
			})
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	updateChallenges() {
		getChallenges(this.state.apiServer)
			.then(this.updateState)
	}

	updateState(challenges, isAuthorized = true) {
		updateTime(challenges || this.state.challenges, this.state.apiServer)
			.then(res => {
				this.setState({
					challenges: res,
					isAuthorized,
				})
			})
	}

	login(useStorage = false) {
		this.interval = setInterval(this.updateState, 15000)

		const challenges = useStorage &&
			JSON.parse(localStorage.getItem('challenges'))

		challenges
			? this.updateState(challenges)
			: this.updateChallenges()
	}

	logout() {
		clearInterval(this.interval)
		localStorage.clear()

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
