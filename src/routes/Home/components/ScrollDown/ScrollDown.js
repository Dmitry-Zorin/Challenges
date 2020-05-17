import { motion } from 'framer-motion'
import React from 'react'
import arrows from './ScrollDown.animation'
import { arrowDown, container } from './ScrollDown.module.scss'

const numberOfArrows = 3

const ScrollDown = ({ target }) => (
	<>
		<br className='uk-hidden@m'/>
		<a href={`#${target}`} className='uk-visible@m' data-uk-scroll='offset: 80'>
			<div className={container}>
				<div className='text-inverse text-medium'>
					<p style={{ lineHeight: 0 }}>Scroll down</p>
					<ul className='uk-list'>
						{[...Array(numberOfArrows).keys()].map(i => (
							<motion.li
								key={i}
								style={{ height: 5 }}
								custom={[numberOfArrows, i]}
								initial={false}
								animate='animate'
								variants={arrows}
							>
								<i className={arrowDown}/>
							</motion.li>
						))}
					</ul>
				</div>
			</div>
		</a>
	</>
)

export default ScrollDown
