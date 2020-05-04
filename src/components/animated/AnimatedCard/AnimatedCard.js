import DataContext from 'contexts/DataContext'
import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import card from './animations.js'

const animations = Object.keys(card)
	.reduce((o, k) => (o[k] = k) && o, {})

const AnimatedCard = ({ children, className, ...props }) => {
	const { userInfo } = useContext(DataContext)
	
	return (
		<motion.div
			className={[
				'uk-card',
				'uk-card-default',
				'uk-card-body',
				userInfo?.settings?.theme,
				className,
			].join(' ')}
			variants={card}
			{...animations}
			{...props}
		>
			{children}
		</motion.div>
	)
}

export default AnimatedCard
