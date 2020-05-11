import { motion } from 'framer-motion'
import React from 'react'
import arrows from './ScrollDown.animation'
import { container } from './ScrollDown.module.scss'

const numberOfArrows = 3
const arrowsArray = [...Array(numberOfArrows).keys()]

const arrow = {
	borderStyle: 'solid',
	borderWidth: '0 1px 1px 0',
	display: 'inline-block',
	padding: 4,
	transform: 'rotate(45deg)',
}

const ScrollDown = ({ target }) => (
	<>
		<br className='uk-hidden@m'/>
		<a
			href={`#${target}`}
			className='uk-visible@m'
			data-uk-scroll='offset: 80'
		>
			<div className={`${container} uk-flex uk-flex-center uk-flex-middle`}>
				<div className='uk-text-center text-medium uk-margin-small-bottom'>
					<p>Scroll down</p>
					{arrowsArray.map(i => (
						<motion.div
							key={i}
							style={{ height: 5 }}
							custom={[arrowsArray, i]}
							animate='animate'
							variants={arrows}
						>
							<i style={arrow}/>
						</motion.div>
					))}
				</div>
			</div>
		</a>
	</>
)

export default ScrollDown
