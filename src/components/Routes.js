import { UserContext } from 'contexts'
import { useContext } from 'react'
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom'
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
		<ReactRouterRoutes>
			<Route path="login" element={<Login />} />
			{!challenges ? null : !challenges.ongoing ? (
				<Route path="/" element={<Home />} />
			) : (
				<>
					<Route path="/" element={<Dashboard />} />
					<Route path="create" element={<Challenge />} />
					<Route path="edit" element={<Challenge />} />
					<Route path="groups/:group" element={<ChallengeGroupExtended />} />
				</>
			)}
		</ReactRouterRoutes>
	)
}

export default Routes
