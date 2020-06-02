import { Router, useLocation } from '@reach/router'
import { UserContext } from 'contexts'
import { AnimatePresence, motion } from 'framer-motion'
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
	const location = useLocation()
	
	return (
		<AnimatePresence>
			<motion.div
				key={location.key}
				className='uk-position-relative'
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.6 } }}
				exit={{ scale: 0.9, opacity: 0, transition: {duration: 0.2} }}
			>
				<Router primary={false} {...{ location }} className='router'>
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
			</motion.div>
		</AnimatePresence>
	)
}

export default Routes
