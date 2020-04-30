import { motion } from 'framer-motion'
import React from 'react'
import button from './animations.js'

const AnimatedButton = ({ children, className = '', submit = false, primary = false, ...props }) => (
	<motion.button
		type={submit ? 'submit' : 'button'}
		className={`
			uk-button
			uk-button-${primary ? 'primary' : 'default'}
			${className}
		`}
		style={{zIndex: 200}}
		{...button}
		{...props}
	>
		<p>{children}</p>
	</motion.button>
)

export default AnimatedButton
