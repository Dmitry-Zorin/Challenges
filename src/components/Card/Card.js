import DataContext from 'contexts/DataContext'
import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import card from './Card.animation'

const animations = Object.keys(card)
	.reduce((o, k) => (o[k] = k) && o, {})

const Card = ({ large, className = '', children, ...props }) => {
	const { userInfo } = useContext(DataContext)
	
	return (
		<motion.div
			className={`
				uk-card
				uk-card-default
				uk-card-body
				${large ? 'large' : ''}
				${userInfo?.settings?.theme}
				${className}
			`}
			variants={card}
			{...animations}
			{...props}
		>
			{children}
		</motion.div>
	)
}

export default Card
