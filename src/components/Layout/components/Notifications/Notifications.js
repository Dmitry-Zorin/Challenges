import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataContext from 'contexts/DataContext'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import styles from './Notifications.module.scss'

const { notification, container, ...types } = styles

const transition = { duration: 0.4 }
const initial = { opacity: 0, scale: 0.25, y: -30 }
const animate = { opacity: 1, scale: 1, y: 0 }
const exit = { ...initial, transition }

animate.transition = {
	...transition,
	type: 'spring',
	stiffness: 150,
	damping: 15,
}

const Notification = () => {
	const { notifications, removeNotification } = useContext(DataContext)
	
	return (
		<ul className={container}>
			<AnimatePresence>
				{[...notifications].reverse()
					.map(({ id, title, message, icon, type = 'info' }) => (
						<motion.li key={id} {...{ transition }} animate>
							<motion.div
								className={[notification, types[type]].join(' ')}
								onClick={() => removeNotification(id)}
								{...{ initial, animate, exit }}
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
