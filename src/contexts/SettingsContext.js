import UserContext from 'contexts/UserContext'
import { defaultUserSettings } from 'data/settings.json'
import React, { createContext, useContext, useEffect, useState } from 'react'

const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {
	const { userInfo } = useContext(UserContext)
	
	const [settings, setSettings] = useState(
		JSON.parse(localStorage.getItem('settings'))
		|| defaultUserSettings,
	)
	
	const changeSetting = (setting) => {
		setSettings(s => ({ ...s, ...setting }))
	}
	
	useEffect(() => {
		setSettings(userInfo?.settings || defaultUserSettings)
	}, [userInfo])
	
	return (
		<SettingsContext.Provider value={{ settings, changeSetting }}>
			{children}
		</SettingsContext.Provider>
	)
}

export default SettingsContext
