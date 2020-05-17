import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotificationContext from 'contexts/NotificationContext'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import notification from './Notifications.animation'
import styles from './Notifications.module.scss'

const { container, ...types } = styles

const Notification = () => {
	const { notifications, removeNotification } = useContext(NotificationContext)
	
	return (
		<ul className={container}>
			<AnimatePresence>
				{[...notifications].reverse()
					.map(({ id, title, message, icon, type = 'info' }) => (
						<motion.li
							key={id}
							transition={{ duration: 0.5, ease: 'easeOut' }}
							animate
						>
							<motion.div
								className={`${styles.notification} ${types[type]}`}
								onClick={() => removeNotification(id)}
								{...notification}
							>
								<FontAwesomeIcon size='2x' transform='grow-2' {...{ icon }}/>
								<div className='uk-width-expand uk-margin-right'>
									<p className='uk-text-bold'>{title}</p>
									{message && <p>{message}</p>}
								</div>
							</motion.div>
						</motion.li>
					))}
			</AnimatePresence>
		</ul>
	)
}

export default Notification
