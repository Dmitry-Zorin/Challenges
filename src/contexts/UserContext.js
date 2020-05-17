import NotificationContext from 'contexts/NotificationContext'
import RequestContext from 'contexts/RequestContext'
import { updateTimeout } from 'data/settings.json'
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'
import { updateTime } from 'scripts/time'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const { addNotification } = useContext(NotificationContext)
	const { getUserInfo } = useContext(RequestContext)
	
	const [userInfo, setUserInfo] = useState()
	const [challenges, setChallenges] = useState()
	const [updateInterval, setUpdateInterval] = useState()
	
	const updateChallenges = useCallback(challenges => {
		setChallenges(c => updateTime(challenges || c, addNotification))
	}, [addNotification])
	
	const login = useCallback(({ username, challenges, settings }) => {
		setUserInfo({ username, settings })
		updateChallenges(challenges)
		setUpdateInterval(setInterval(updateChallenges, updateTimeout))
	}, [updateChallenges])
	
	const logout = useCallback(() => {
		clearInterval(updateInterval)
		setUserInfo({})
		setChallenges({})
	}, [updateInterval])
	
	useEffect(() => {
		if (challenges) return
		setChallenges(JSON.parse(localStorage.getItem('challenges')) || {})
		getUserInfo().then(login).catch(logout)
	}, [challenges, userInfo, getUserInfo, login, logout])
	
	return (
		<UserContext.Provider
			value={{ userInfo, challenges, updateChallenges, login, logout }}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
