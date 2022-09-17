import { motion } from 'framer-motion'
import animations from './animations'

const Animation = ({ type, children, item = false, ...props }) => (
	<motion.div
		variants={animations[type]}
		{...(item
			? undefined
			: {
					initial: 'initial',
					animate: 'animate',
					exit: 'initial',
			  })}
		{...props}
	>
		{children}
	</motion.div>
)

export default Animation
