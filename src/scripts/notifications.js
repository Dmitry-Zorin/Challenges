import React from 'react'
import { store } from 'react-notifications-component'
import 'styles/notifications.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const addNotification = ({
	title, message,
	type = 'custom',
	icon = type === 'danger' ? 'exclamation-circle' : 'info-circle',
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
			<div className={`notification-${type} uk-width-1-1`}>
				<div className='notification-content'>
					<div className='uk-grid'>
						<div className='uk-height-1-1 uk-margin-auto-vertical'>
							<FontAwesomeIcon icon={icon} transform='grow-15 right-13'/>
						</div>
						<div className='uk-width-expand' style={{ marginRight: '20px' }}>
							<p className='notification-title'>{title}</p>
							<p className='notification-message'>{message}</p>
						</div>
					</div>
				</div>
			</div>
		),
		...settings,
	})
}
