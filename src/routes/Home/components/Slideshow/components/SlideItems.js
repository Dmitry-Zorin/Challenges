import Animation from 'components/Animation'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import features from 'routes/Home/features'

const SlideItems = ({ isVisible }) => (
	<ul className='uk-slideshow-items'>
		{features.map(({ src, Component }) => (
			<li key={src} className='round-border'>
				<img src={src} alt=''/>
				<AnimatePresence>
					{isVisible && (
						<Animation type='fade' animate='animate' exit='initial'>
							<div
								className='
									uk-overlay
									uk-overlay-primary
									uk-position-top-right
									uk-position-small
									uk-visible@m
									uk-transition-fade
									uk-width-1-3
									primary-border
								'
							>
								<Component/>
							</div>
						</Animation>
					)}
				</AnimatePresence>
			</li>
		))}
	</ul>
)

export default SlideItems
