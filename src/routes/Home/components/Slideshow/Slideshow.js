import React from 'react'
import { SlideItems, Slidenav } from './components'

const Slideshow = () => (
	<div id='slideshow' className='uk-card uk-card-default uk-card-body uk-margin-remove-top'>
		<div
			className='uk-position-relative uk-visible-toggle uk-padding-remove'
			data-uk-slideshow='ratio: 13:12'
		>
			<SlideItems/>
			<Slidenav side='left'/>
			<Slidenav side='right'/>
			<ul className='uk-slideshow-nav uk-dotnav uk-flex-center uk-margin-top'/>
		</div>
	</div>
)

export default Slideshow
