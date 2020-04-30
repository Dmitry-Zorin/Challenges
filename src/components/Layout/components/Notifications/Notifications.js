import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataContext from 'contexts/DataContext'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import styles from './Notifications.module.scss'

const { notification, container, icon: iconStyle, ...types } = styles

const Notification = () => {
	const { notifications, removeNotification } = useContext(DataContext)
	return (
		<ul className={container}>
			<AnimatePresence>
				{notifications.map(({ id, title, message, icon, type }) => (
					<motion.li key={id} exit={{ opacity: 0, scale: 0.5 }} animate>
						<motion.div
							className={['uk-card', notification, types[type]].join(' ')}
							onClick={() => removeNotification(id)}
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
						>
							<div className='uk-flex'>
								<div className={iconStyle}>
									<FontAwesomeIcon
										size='2x'
										className='icon-center'
										transform='shrink-2 down-1 right-1'
										{...{ icon }}
									/>
								</div>
								<div className='uk-width-expand uk-margin-right'>
									<p className='uk-text-bold'>{title}</p>
									<p>{message}</p>
								</div>
							</div>
						</motion.div>
					</motion.li>
				))}
			</AnimatePresence>
		</ul>
	)
}

export default Notification
