import { motion } from 'framer-motion'
import React from 'react'
import card from './Card.animation'

const Card = ({ large, className = '', children, ...props }) => (
	<motion.div
		className={`
			uk-card
			uk-card-default
			uk-card-body
			${large ? 'large' : ''}
			${className}
		`}
		initial='initial'
		animate='animate'
		variants={card}
		{...props}
	>
		{children}
	</motion.div>
)

export default Card
