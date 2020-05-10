import { motion } from 'framer-motion'
import React from 'react'

const NavItem = ({ children }) => (
	<motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
		{children}
	</motion.li>
)

export default NavItem
