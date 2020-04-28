import { addNotification } from 'scripts/notification'

export const handleError = (context, err, message = 'Error') => {
	const errors = err.response?.data?.errors
	if (errors) console.log('Errors', errors.map(e => e.message))
	addNotification(context, { title: 'Error', message, type: 'danger' })
}
