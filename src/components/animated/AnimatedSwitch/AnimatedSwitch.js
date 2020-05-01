import { motion } from 'framer-motion'
import React from 'react'
import { off, on, switch as switchStyle } from './AnimatedSwitch.module.scss'

const transition = { duration: 0.2 }

const AnimatedSwitch = ({ isOn, className, ...props }) => (
	<motion.div
		className={[switchStyle, isOn ? on : off, className].join(' ')}
		{...{ transition, ...props }}
		animate
	>
		<motion.div {...{ transition }} animate/>
	</motion.div>
)

export default AnimatedSwitch
