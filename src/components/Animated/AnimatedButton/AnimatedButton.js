import { motion } from 'framer-motion'
import React from 'react'
import button from './animations.js'

const AnimatedButton = ({ className, small = false, ...props }) => (
	<motion.button
		className={`uk-button ${className}`}
		{...button[small ? 'small' : 'default']}
		{...props}
	/>
)

export default AnimatedButton
