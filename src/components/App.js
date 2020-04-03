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
	getChallenges,
	handleError,
	sortChallenges,
	updateTime,
} from '../services/helper'

export default class App extends PureComponent {
	constructor(props) {
		super(props)
		this.updateChallenges = this.updateChallenges.bind(this)
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)

		this.state = {
			...DataContext._currentValue,
			challenges: {},
			update: this.updateChallenges,
		}
		this.challengesPromise = getChallenges(this.state.apiServer)
	}

	componentDidMount() {
		this.challengesPromise
			.then(({ ongoing }) => {
				ongoing ? this.login() : this.logout()
			})
			.catch(err => {
				handleError(err, 'Failed to check user authorization')
			})
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	async updateChallenges(challenges, isAuthorized = true) {
		challenges = await updateTime(
			challenges
				? sortChallenges(challenges)
				: this.state.challenges.ongoing
				? this.state.challenges
				: await getChallenges(this.state.apiServer),
			this.state.apiServer,
		)
		this.setState({ challenges, isAuthorized })
	}

	login() {
		this.interval = setInterval(this.updateChallenges, 15000)
		this.updateChallenges()
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
