import AnimatedCard from 'components/animated/AnimatedCard'
import React from 'react'
import { SlideItems, Slidenav } from './components'

const Slideshow = () => (
	<AnimatedCard id='slideshow' className='uk-margin-remove-top' large>
		<div
			className='uk-position-relative uk-visible-toggle'
			data-uk-slideshow='ratio: 13:12'
		>
			<SlideItems/>
			<Slidenav side='left'/>
			<Slidenav side='right'/>
			<div className='padding uk-padding-remove-bottom'>
				<ul className='uk-slideshow-nav uk-dotnav uk-flex-center'/>
			</div>
		</div>
	</AnimatedCard>
)

export default Slideshow
