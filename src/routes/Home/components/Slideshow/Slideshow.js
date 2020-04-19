import React from 'react'
import { Card } from 'uikit-react'
import { SlideItems, Slidenav } from './components'

const Slideshow = () => (
	<Card id='slideshow'>
		<div
			className='uk-position-relative uk-visible-toggle uk-padding-remove'
			data-uk-slideshow='ratio: 13:12'
		>
			<SlideItems/>
			<Slidenav side='left'/>
			<Slidenav side='right'/>
			<ul className='uk-slideshow-nav uk-dotnav uk-flex-center uk-margin'/>
		</div>
	</Card>
)

export default Slideshow
