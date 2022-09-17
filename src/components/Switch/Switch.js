import { motion } from 'framer-motion'
import { gentleSpringConfig } from 'scripts/animations'

import styles from './Switch.module.scss'

const { off, on, slider, switch: _switch } = styles

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
			transition={gentleSpringConfig}
		/>
	</div>
)

export default Switch
