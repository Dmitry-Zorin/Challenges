import { Link } from '@reach/router'
import AnimatedCard from 'components/animated/AnimatedCard'
import { motion } from 'framer-motion'
import { upperFirst } from 'lodash'
import React, { useState } from 'react'

const Overlay = ({ children, to = '', text }) => {
	const [isVisible, setIsVisible] = useState(false)
	
	return (
		<Link {...{ to }}>
			<AnimatedCard
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
			>
				{children}
				<motion.div
					className={`
						uk-overlay-default
						uk-position-right
						uk-hidden-touch
						${isVisible ? 'blur' : ''}
					`}
					style={{ width: 150 }}
					initial={false}
					animate={{ x: isVisible ? 0 : '100%', opacity: +isVisible }}
					transition={{ duration: 0.4 }}
				>
					<p className='uk-position-center uk-text-primary'>
						{upperFirst(text)}
					</p>
				</motion.div>
			</AnimatedCard>
		</Link>
	)
}

export default Overlay
