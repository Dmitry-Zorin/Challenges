import { motion } from 'framer-motion'
import React from 'react'
import switcherItem from './animations.js'

const AnimatedSwitcherItem = ({ className, children }) => (
	<motion.li className={`uk-text-center ${className}`} {...switcherItem}>
		{children}
	</motion.li>
)

export default AnimatedSwitcherItem
