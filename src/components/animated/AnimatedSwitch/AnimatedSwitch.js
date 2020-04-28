import { motion } from 'framer-motion'
import React from 'react'
import { off, on, switch as switchStyle } from './AnimatedSwitch.module.scss'

const duration = 0.15

const AnimatedSwitch = ({ isOn, className, ...props }) => (
	<motion.div
		className={[switchStyle, isOn ? on : off, className].join(' ')}
		transition={{ duration: 2 * duration }}
		{...props}
		animate
	>
		<motion.div transition={{ duration }} animate/>
	</motion.div>
)

export default AnimatedSwitch
