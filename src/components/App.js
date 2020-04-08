import React, { PureComponent } from 'react'
import { Router } from '@reach/router'
import { Layout } from './Layout'
import { Login } from 'routes/Login'
import { Auth } from './Auth'
import { NotFoundPage } from 'routes/404'
import { DataContext } from 'contexts/DataContext'
import { Dashboard } from 'routes/Dashboard'
import { Challenge } from 'routes/Challenge'
import { ChallengeGroupExtended } from 'routes/ChallengeGroupExtended'
import { updateTime } from 'scripts/time'
import { getUserInfo } from 'scripts/requests'

export class App extends PureComponent {
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
		getUserInfo(this.state).then(this.login).catch(this.logout)
		
		// Timeout for the mobile devices
		setTimeout(() => {
			this.setState({
				challenges: JSON.parse(localStorage.getItem('challenges')) || {},
			})
		}, 0)
	}
	
	componentWillUnmount() {
		clearInterval(this.interval)
	}
	
	toggleSpinner(spinnerIsVisible) {
		this.setState({ spinnerIsVisible })
	}
	
	async updateChallenges(challenges) {
		challenges = await updateTime(
			challenges || this.state.challenges,
			this.state.apiServer,
		)
		this.setState({ challenges })
	}
	
	login(user) {
		this.setState({ userIsAuthorized: true })
		this.updateChallenges(user.challenges)
		this.interval = setInterval(this.updateChallenges, 15000)
	}
	
	logout() {
		clearInterval(this.interval)
		this.setState({
			challenges: {},
			userIsAuthorized: false,
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
