import React from 'react'
import { store } from 'react-notifications-component'
import 'styles/notifications.scss'

export const addNotification = ({
	type = 'custom',
	animationIn = type === 'danger' ? 'bounceIn' : 'fadeIn',
	animationOut = type === 'danger' ? 'bounceOut' : 'fadeOut',
	...settings
}) => {
	store.addNotification({
		insert: 'top',
		container: 'top-right',
		animationIn: ['animated', animationIn],
		animationOut: ['animated', animationOut],
		dismiss: { duration: 3000 },
		content: (
			<div
				className={`notification-${type}`}
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
