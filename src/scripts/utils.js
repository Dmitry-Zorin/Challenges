import React from 'react'
import { store } from 'react-notifications-component'
import 'styles/notifications.scss'

export const addNotification = settings => {
	store.addNotification({
		insert: 'top',
		container: 'top-right',
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: { duration: 3000 },
		content: (
			<div
				className={`notification-${settings.type || 'custom'}`}
				style={{ width: '100%' }}
			>
				<div className='notification-content'>
					<p className='notification-title'>{settings.title}</p>
					<p className='notification-message'>{settings.message}</p>
				</div>
			</div>
		),
		...settings,
	})
}

export const handleError = (err, message = 'Error') => {
	const errors = err.response?.data?.errors
	if (errors) console.log('Errors', errors.map(e => e.message))
	addNotification({ title: 'Error', message, type: 'danger' })
}
