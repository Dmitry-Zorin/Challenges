import { motion } from 'framer-motion'
import React from 'react'
import div from './animations.js'

const AnimatedDiv = ({ children, ...props }) => (
	<motion.div variants={div} {...props}>
		{children}
	</motion.div>
)

export default AnimatedDiv
