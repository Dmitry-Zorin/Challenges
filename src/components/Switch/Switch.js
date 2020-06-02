import { motion } from 'framer-motion'
import React from 'react'
import { off, on, slider, switch as _switch } from './Switch.module.scss'

const Switch = ({ isOn, onClick, ...props }) => (
	<div
		className={`${_switch} ${isOn ? on : off}`}
		onMouseDown={onClick}
		{...props}
	>
		<motion.div
			className={slider}
			initial={false}
			animate={{ x: `${100 * isOn}%` }}
			transition={{ type: 'spring', mass: 0.25 }}
		/>
	</div>
)

export default Switch
