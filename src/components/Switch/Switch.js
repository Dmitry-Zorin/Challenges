import { motion } from 'framer-motion'
import React from 'react'
import { off, on, slider, switch as _switch } from './Switch.module.scss'

const Switch = ({ isOn, ...props }) => (
	<motion.div className={`${_switch} ${isOn ? on : off}`} {...props} animate>
		<motion.div className={slider} animate/>
	</motion.div>
)

export default Switch
