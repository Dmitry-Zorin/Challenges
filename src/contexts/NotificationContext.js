import settings from 'data/settings.json'
import { createContext, useState } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([])

	const addNotification = (info) => {
		const id = JSON.stringify(info)

		setNotifications((n) => {
			if (n.some((e) => e.id === id)) {
				return n
			}

			const notification = {
				id,
				icon: `${info.type === 'danger' ? 'exclamation' : 'info'}-circle`,
				...info,
			}

			setTimeout(() => {
				setNotifications((n) => (n[0]?.id === id ? n.slice(1) : n))
			}, settings.notificationTimeout)

			return [...n, notification]
		})
	}

	const removeNotification = (id) => {
		setNotifications((n) => n.filter((n) => n.id !== id))
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
