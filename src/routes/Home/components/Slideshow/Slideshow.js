import Animation from 'components/Animation'
import Card from 'components/Card'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { SlideItems, Slidenav } from './components'

const Slideshow = (props) => {
	const [isVisible, setIsVisible] = useState(false)
	
	return (
		<Card className='uk-margin-remove-top' {...props} large>
			<div
				className='uk-position-relative'
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
				data-uk-slideshow='ratio: 13:12'
			>
				<SlideItems {...{ isVisible }}/>
				<AnimatePresence>
					{isVisible && (
						<Animation type='fade' animate='animate' exit='initial'>
							<Slidenav side='left'/>
							<Slidenav side='right'/>
						</Animation>
					)}
				</AnimatePresence>
				<div className='padding uk-padding-remove-bottom'>
					<ul className='uk-slideshow-nav uk-dotnav uk-flex-center'/>
				</div>
			</div>
		</Card>
	)
}

export default Slideshow
