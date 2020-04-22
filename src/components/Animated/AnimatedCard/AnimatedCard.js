import { motion } from 'framer-motion'
import React from 'react'
import card from './animations.js'

const AnimatedCard = ({ className, children, ...props }) => (
	<motion.div
		className={`uk-card uk-card-default ${className}`}
		{...card}
		{...props}
	>
		{children}
	</motion.div>
)

export default AnimatedCard
