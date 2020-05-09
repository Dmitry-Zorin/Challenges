import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React from 'react'
import button from './animation.js'

const AnimatedButton = ({ icon, value, submit, type = 'default', className = '', ...props }) => (
	<div className='uk-child-width-expand'>
		<motion.button
			type={submit ? 'submit' : 'button'}
			className={`uk-button uk-button-${type} ${className}`}
			{...button}
			{...props}
		>
			<p>
				{icon && (
					<FontAwesomeIcon
						className={value ? '' : 'icon-center'}
						{...{ icon }}
					/>
				)}
				{value}
			</p>
		</motion.button>
	</div>
)

export default AnimatedButton
