import { motion } from 'framer-motion'
import React from 'react'

const Animation = ({ type, children, ...props }) => (
	<motion.div variants={require(`./animations/${type}`).default} {...props}>
		{children}
	</motion.div>
)

export default Animation
