import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React from 'react'
import switcherItem from './animations.js'

const AnimatedSwitcherItem = ({ icon, value, type, active, onClick, className, ...props }) => (
	<motion.li
		className={['uk-text-center', active && 'uk-active', className].join(' ')}
		{...switcherItem}
		{...props}
	>
		<a href='/#' className={type} onClick={e => onClick(e.preventDefault())}>
			<p>
				{icon && (
					<FontAwesomeIcon transform='shrink-3 down-0.75' {...{ icon }}/>
				)}
				{value}
			</p>
		</a>
	</motion.li>
)

export default AnimatedSwitcherItem
