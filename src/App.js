import { Router } from '@reach/router'
import Layout from 'components/Layout'
import DataContext from 'contexts/DataContext'
import {
	defaultUserSettings,
	notificationTimeout,
	updateTimeout,
} from 'data/settings.json'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Challenge,
	ChallengeGroupExtended,
	Dashboard,
	Home,
	Login,
} from 'routes'
import { getUserInfo, saveSettings } from 'scripts/requests'
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
		notifications: [],
		addNotification: (notification) => {
			contextRef.current.notifications.push(notification)
			updateContext()
			setTimeout(() => {
				if (context.notifications[0]?.id !== notification.id) return
				updateContext({ notifications: context.notifications.slice(1) })
			}, notificationTimeout)
		},
		removeNotification: (id) => {
			const notifications = context.notifications.filter(n => n.id !== id)
			updateContext({ notifications })
		},
		changeSetting: (setting) => {
			Object.assign(contextRef.current.userInfo.settings, {
				...setting,
				areChanged: true,
			})
			updateContext()
		},
		saveSettings: () => {
			saveSettings(context, context.userInfo.settings)
				.then(() => {
					const settings = contextRef.current.userInfo.settings
					delete settings.areChanged
					localStorage.setItem('settings', JSON.stringify(settings))
					updateContext()
				})
				.catch(() => {})
		},
	})
	const contextRef = useRef(context)
	const intervalRef = useRef()
	
	const updateContext = useCallback(context => {
		Object.assign(contextRef.current, context)
		setContext({ ...contextRef.current })
	}, [])
	
	const login = useCallback(({ username, challenges, settings }) => {
		localStorage.setItem('settings', JSON.stringify(settings))
		updateContext({ userInfo: { username, settings } })
		context.updateChallenges(challenges)
		intervalRef.current = setInterval(context.updateChallenges, updateTimeout)
	}, [context, updateContext])
	
	const logout = useCallback(() => {
		clearInterval(intervalRef.current)
		updateContext({
			challenges: {},
			userInfo: { settings: defaultUserSettings },
		})
	}, [updateContext])
	
	useEffect(() => clearInterval(intervalRef.current), [])
	
	useEffect(() => {
		if (!context.challenges) {
			const challenges = JSON.parse(localStorage.getItem('challenges')) || {}
			updateContext({ challenges })
		}
		else if (context.spinnerIsVisible === undefined) {
			const settings = JSON.parse(localStorage.getItem('settings'))
			updateContext({ userInfo: { settings: settings || defaultUserSettings } })
			getUserInfo(context).then(login).catch(logout)
		}
	}, [context, updateContext, login, logout])
	
	return (
		<DataContext.Provider value={context}>
			<Router primary={false}>
				<Layout path='/'>
					<Login path='login' {...{ login, logout }}/>
					{!context.challenges ? null : !context.challenges.ongoing ? (
						<Home {...{ login }} default/>
					) : (
						<>
							<Dashboard default/>
							<Challenge path='create'/>
							<Challenge path='edit'/>
							<ChallengeGroupExtended path='groups/:group'/>
						</>
					)}
				</Layout>
			</Router>
		</DataContext.Provider>
	)
}

export default App
