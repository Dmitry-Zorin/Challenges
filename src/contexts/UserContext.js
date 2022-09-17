import NotificationContext from 'contexts/NotificationContext'
import RequestContext from 'contexts/RequestContext'
import settings from 'data/settings.json'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { updateTime } from 'scripts/time'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const { addNotification } = useContext(NotificationContext)
	const { getUserInfo } = useContext(RequestContext)
	const updateInterval = useRef()

	const [userInfo, setUserInfo] = useState()
	const [challenges, setChallenges] = useState()

	const updateChallenges = useCallback(
		(challenges) => {
			setChallenges((c) => updateTime(challenges || c, addNotification))
		},
		[addNotification],
	)

	const login = useCallback(
		({ username, challenges }) => {
			setUserInfo({ username })
			updateChallenges(challenges)
			if (!updateInterval.current) {
				updateInterval.current = setInterval(
					updateChallenges,
					settings.updateTimeout,
				)
			}
		},
		[updateChallenges],
	)

	const logout = useCallback(() => {
		clearInterval(updateInterval.current)
		updateInterval.current = undefined
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
