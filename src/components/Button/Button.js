import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React from 'react'
import buttonAnimation from './Button.animation'

const Button = ({ icon, value, submit, type = 'default', className = '', ...props }) => (
	<motion.button
		type={submit ? 'submit' : 'button'}
		className={`uk-button uk-button-${type} ${className} uk-width-1-1`}
		{...buttonAnimation}
		{...props}
	>
		<p>
			{icon && (
				<FontAwesomeIcon className={value ? '' : 'icon-center'} {...{ icon }}/>
			)}
			{value}
		</p>
	</motion.button>
)

export default Button
