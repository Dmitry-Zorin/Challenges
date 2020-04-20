import { Router } from '@reach/router'
import Layout from 'components/Layout'
import DataContext from 'contexts/DataContext'
import { challengeGroups, updateTimeout } from 'data/settings.json'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Challenge,
	ChallengeGroupExtended,
	Dashboard,
	Home,
	Login,
} from 'routes'
import { getUserInfo } from 'scripts/requests'
import { updateTime } from 'scripts/time'

const App = () => {
	const [context, setContext] = useState({
		showSpinner: (spinnerIsVisible = true) => {
			updateContext({ spinnerIsVisible })
		},
		updateChallenges: (challenges) => {
			challenges = updateTime(contextRef.current, challenges)
			updateContext({ challenges })
		},
	})
	const contextRef = useRef(context)
	const intervalRef = useRef()
	
	const updateContext = useCallback(context => {
		Object.assign(contextRef.current, context)
		setContext({ ...contextRef.current })
	}, [])
	
	const login = useCallback(({ username, challenges }) => {
		updateContext({ userInfo: { username } })
		context.updateChallenges(challenges)
		intervalRef.current = setInterval(context.updateChallenges, updateTimeout)
	}, [context, updateContext])
	
	const logout = useCallback(() => {
		clearInterval(intervalRef.current)
		updateContext({ challenges: {}, userInfo: {} })
	}, [updateContext])
	
	useEffect(() => clearInterval(intervalRef.current), [])
	
	useEffect(() => {
		if (context.challenges === undefined) {
			const challenges = JSON.parse(localStorage.getItem('challenges')) || {}
			updateContext({ challenges })
		}
		else if (context.spinnerIsVisible === undefined) {
			getUserInfo(context).then(login).catch(logout)
		}
	}, [context, updateContext, login, logout])
	
	return (
		<DataContext.Provider value={context}>
			<Router primary={false}>
				<Layout path='/'>
					<Login path='login' {...{ login, logout }}/>
					{!context.challenges?.ongoing
						? <Home {...{ login }} default/> : (
							<>
								<Dashboard default/>
								<Challenge path='create'/>
								<Challenge path='edit'/>
								{challengeGroups.map(g => `/${g}`).map((g, i, cg) => (
									<ChallengeGroupExtended
										key={i}
										path={g}
										right={cg[++i % 3]}
										left={cg[++i % 3]}
									/>
								))}
							</>
						)
					}
				</Layout>
			</Router>
		</DataContext.Provider>
	)
}

export default App
