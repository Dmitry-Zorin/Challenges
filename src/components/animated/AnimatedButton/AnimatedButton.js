import { motion } from 'framer-motion'
import React from 'react'
import button from './animations.js'

const AnimatedButton = ({ children, className, primary = false, small = false, ...props }) => (
	<motion.button
		className={`
			uk-button
			uk-button-${primary ? 'primary' : 'default'}
			${className}
		`}
		{...button[small ? 'small' : 'default']}
		{...props}
	>
		<p>{children}</p>
	</motion.button>
)

export default AnimatedButton
