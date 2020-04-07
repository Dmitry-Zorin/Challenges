import error from 'data/notifications/error'
import { store } from 'react-notifications-component'

export const addNotification = settings => (
	store.addNotification({
		type: 'info',
		insert: 'top',
		container: 'top-right',
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: { duration: 3000 },
		...settings,
	})
)

export const handleError = (err, message) => {
	console.log(err.toJSON ? err.toJSON() : err)
	addNotification({
		...error.error,
		message: message || err.message,
	})
}
