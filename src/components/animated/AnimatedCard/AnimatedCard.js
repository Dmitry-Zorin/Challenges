import { motion } from 'framer-motion'
import React from 'react'
import card from './animations.js'

const animations = Object.keys(card)
	.reduce((o, k) => (o[k] = k) && o, {})

const AnimatedCard = ({ children, className }) => (
	<motion.div
		className={`uk-card uk-card-default ${className}`}
		variants={card}
		{...animations}
	>
		{children}
	</motion.div>
)

export default AnimatedCard
