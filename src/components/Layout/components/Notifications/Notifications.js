import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataContext from 'contexts/DataContext'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import styles from './Notifications.module.scss'

const { notification, container, icon: iconStyle, ...types } = styles

const transition = { duration: 0.5 }
const initial = { opacity: 0, scale: 0.25, y: -30 }
const animate = { opacity: 1, scale: 1, y: 0 }
const exit = initial

const Notification = () => {
	const { notifications, removeNotification } = useContext(DataContext)
	
	return (
		<ul className={container}>
			<AnimatePresence>
				{[...notifications].reverse()
					.map(({ id, title, message, icon, type = 'info' }) => (
						<motion.li key={id} {...{ transition }} animate>
							<motion.div
								className={[notification, types[type], 'uk-flex'].join(' ')}
								onClick={() => removeNotification(id)}
								{...{ initial, animate, exit, transition }}
							>
								<FontAwesomeIcon
									className={iconStyle}
									size='2x'
									transform='grow-2'
									{...{ icon }}
								/>
								<div className='uk-width-expand uk-margin-right'>
									<p className='uk-text-bold'>{title}</p>
									<p>{message}</p>
								</div>
							</motion.div>
						</motion.li>
					))}
			</AnimatePresence>
		</ul>
	)
}

export default Notification
