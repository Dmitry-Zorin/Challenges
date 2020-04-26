import { motion } from 'framer-motion'
import React from 'react'
import listItem from './animations.js'

const AnimatedListItem = ({ children, ...props }) => (
	<motion.li {...listItem} {...props}>
		{children}
	</motion.li>
)

export default AnimatedListItem
