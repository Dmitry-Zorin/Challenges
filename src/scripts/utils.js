import { store } from 'react-notifications-component'

export const addNotification = settings => {
	store.addNotification({
		type: 'info',
		insert: 'top',
		container: 'top-right',
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: { duration: 3000 },
		...settings,
	})
}

export const handleError = (err, message = 'Error') => {
	const errors = err.response?.data?.errors
	if (errors) console.log('Errors', errors.map(e => e.message))
	addNotification({ title: 'Error', message, type: 'danger' })
}
