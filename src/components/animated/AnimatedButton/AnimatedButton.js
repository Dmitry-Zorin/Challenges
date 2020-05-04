import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React from 'react'
import button from './animations.js'

const AnimatedButton = ({ icon, value, className = '', submit = false, primary = false, ...props }) => (
	<motion.button
		type={submit ? 'submit' : 'button'}
		className={`
			uk-button
			uk-button-${primary ? 'primary' : 'default'}
			${className}
		`}
		{...button}
		{...props}
	>
		{icon && (
			<FontAwesomeIcon className={value ? '' : 'icon-center'} {...{ icon }}/>
		)}
		{value}
	</motion.button>
)

export default AnimatedButton
