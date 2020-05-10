import { motion } from 'framer-motion'
import React from 'react'
import { off, on, switch as switchStyle } from './Switch.module.scss'

const transition = { duration: 0.2 }

const Switch = ({ isOn, ...props }) => (
	<motion.div
		className={[switchStyle, isOn ? on : off].join(' ')}
		{...{ transition, ...props }}
		animate
	>
		<motion.div {...{ transition }} animate/>
	</motion.div>
)

export default Switch
