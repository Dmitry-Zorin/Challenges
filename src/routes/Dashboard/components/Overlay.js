import { motion } from 'framer-motion'
import { upperFirst } from 'lodash'
import React from 'react'

const Overlay = ({ text, isVisible }) => (
	<motion.div
		className={`
			uk-overlay-default
			uk-position-right
			uk-hidden-touch
			uk-flex
			${isVisible ? 'blur' : ''}
		`}
		style={{ width: 150 }}
		initial={{ x: '100%', opacity: 0 }}
		animate={{ x: isVisible ? 0 : '100%', opacity: +isVisible }}
		transition={{ duration: 0.4 }}
	>
		<p className='uk-margin-auto-vertical uk-text-primary uk-text-center text-medium'>
			{upperFirst(text)}
		</p>
	</motion.div>
)

export default Overlay
