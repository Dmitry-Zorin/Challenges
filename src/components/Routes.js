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
		<AnimatePresence exitBeforeEnter>
			<motion.div
				key={location.pathname.split('/')[1] || location.key}
				initial='initial'
				animate='animate'
				exit='exit'
				variants={{
					initial: { opacity: 0, scale: 0.9 },
					animate: {
						opacity: 1,
						scale: 1,
						transition: {
							duration: 0.6,
							ease: 'easeOut'
						},
					},
					exit: {
						opacity: 0,
						scale: 0.9,
						transition: {
							ease: 'easeOut',
						},
					},
				}}
			>
				<Router primary={false} {...{ location }}>
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
