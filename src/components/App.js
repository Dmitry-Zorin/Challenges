import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { challengeGroups, updateTimeout } from 'data/settings.json'
import { getUserInfo } from 'scripts/requests'

export const App = () => {
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
		setContext({ ...contextRef.current })
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
			updateContext()
		}
	}, [context, updateContext, login, logout])
	
	return (
		<DataContext.Provider value={context}>
			<Router primary={false}>
				<Layout path='/'>
					<NotFoundPage default/>
					<Dashboard path='/'/>
					<Login path='login' login={login} logout={logout}/>
					<Auth path='create' Component={Challenge}/>
					<Auth path='edit' Component={Challenge}/>
					{challengeGroups.map((g, i) => (
						<ChallengeGroupExtended
							key={i}
							path={`/${g}`}
							right={`/${challengeGroups[++i % 3]}`}
							left={`/${challengeGroups[++i % 3]}`}
						/>
					))}
				</Layout>
			</Router>
		</DataContext.Provider>
	)
}
