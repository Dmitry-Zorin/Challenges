import { Link } from '@reach/router'
import Card from 'components/Card'
import { motion } from 'framer-motion'
import { upperFirst } from 'lodash'
import React, { useState } from 'react'

const Overlay = ({ to = '', text, children }) => {
	const [isVisible, setIsVisible] = useState(false)
	
	const onMouseEnter = () => setIsVisible(true)
	const onMouseLeave = () => setIsVisible(false)
	
	return (
		<Link {...{ to }}>
			<Card className='uk-card-hover' {...{ onMouseEnter, onMouseLeave }}>
				{children}
				<motion.div
					className='uk-overlay-default uk-position-right uk-width-1-5'
					initial={false}
					animate={{ x: `${100 * !isVisible}%`, opacity: +isVisible }}
					transition={{ ease: 'easeOut', duration: 0.5 }}
				>
					<p className='uk-position-center uk-text-primary'>
						{upperFirst(text)}
					</p>
				</motion.div>
			</Card>
		</Link>
	)
}

export default Overlay
