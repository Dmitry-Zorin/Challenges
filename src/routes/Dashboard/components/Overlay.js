import { Link } from '@reach/router'
import Card from 'components/Card'
import { motion } from 'framer-motion'
import { upperFirst } from 'lodash'
import React, { useState } from 'react'

const Overlay = ({ to = '', text, children }) => {
	const [isVisible, setIsVisible] = useState(false)
	
	return (
		<Link {...{ to }}>
			<Card
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
					animate={{
						x: isVisible ? 0 : '100%',
						opacity: +isVisible,
						transition: { duration: 0.4 },
					}}
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
