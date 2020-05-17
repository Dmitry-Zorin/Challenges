import { Router } from '@reach/router'
import { UserContext } from 'contexts'
import React, { useContext } from 'react'
import {
	Challenge,
	ChallengeGroupExtended,
	Dashboard,
	Home,
	Login,
} from 'routes'

const Routes = () => {
	const { challenges } = useContext(UserContext)
	
	return (
		<Router primary={false}>
			<Login path='login'/>
			{!challenges ? null : !challenges.ongoing ? (
				<Home default/>
			) : (
				<>
					<Dashboard default/>
					<Challenge path='create'/>
					<Challenge path='edit'/>
					<ChallengeGroupExtended path='groups/:group'/>
				</>
			)}
		</Router>
	)
}

export default Routes
