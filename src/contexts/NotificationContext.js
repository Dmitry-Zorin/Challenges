import { notificationTimeout } from 'data/settings.json'
import React, { createContext, useState } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([])
	
	const addNotification = (info) => {
		const notification = {
			id: new Date().getTime(),
			icon: `${info.type === 'danger' ? 'exclamation' : 'info'}-circle`,
			...info,
		}
		setNotifications(n => [...n, notification])
		setTimeout(() => {
			setNotifications(n => (
				n[0]?.id === notification.id ? n.slice(1) : n
			))
		}, notificationTimeout)
	}
	
	const removeNotification = (id) => {
		setNotifications(n => n.filter(n => n.id !== id))
	}
	
	return (
		<NotificationContext.Provider
			value={{ notifications, addNotification, removeNotification }}
		>
			{children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext
