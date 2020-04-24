import Notification from 'components/Notification'
import React from 'react'
import { store } from 'react-notifications-component'

export const addNotification = ({
	title,
	message,
	type = 'info',
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
		content: <Notification {...{ type, icon, title, message }}/>,
		...settings,
	})
}
