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
		showSpinner: (isVisible = true) => {
			contextRef.current.spinnerIsVisible = isVisible
			setContext({ ...contextRef.current })
		},
		update: async (challenges) => {
			contextRef.current.challenges =
				await updateTime(contextRef.current, challenges)
			setContext({ ...contextRef.current })
		},
	})
	const contextRef = useRef(context)
	const intervalRef = useRef()
	
	const login = useCallback(({ challenges }) => {
		contextRef.current.userIsAuthorized = true
		context.update(challenges)
		intervalRef.current = setInterval(context.update, updateTimeout)
		setContext({ ...contextRef.current })
	}, [context])
	
	const logout = useCallback(() => {
		clearInterval(intervalRef.current)
		contextRef.current = {
			...contextRef.current,
			challenges: {},
			userIsAuthorized: false,
		}
		setContext({ ...contextRef.current })
	}, [])
	
	useEffect(() => clearInterval(intervalRef.current), [])
	
	useEffect(() => {
		if (context.challenges === undefined) {
			contextRef.current.challenges =
				JSON.parse(localStorage.getItem('challenges')) || {}
		}
		else if (context.spinnerIsVisible === undefined) {
			getUserInfo(context).then(login).catch(logout)
		}
		else return
		
		setContext({ ...contextRef.current })
	}, [context, login, logout])
	
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
