import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import 'styles/notification.scss'
import { Flex, Margin } from 'uikit-react'

const Notification = ({ type, icon, title, message }) => (
	<div className={`notification-${type} uk-width-1-1`}>
		<div className='notification-content'>
			<Flex>
				<p className='notification-icon'>
					<FontAwesomeIcon size='2x' transform='shrink-3' {...{ icon }}/>
				</p>
				<Margin type='right' className='uk-width-expand'>
					<p className='notification-title'>{title}</p>
					<p className='notification-message'>{message}</p>
				</Margin>
			</Flex>
		</div>
	</div>
)

export default Notification
