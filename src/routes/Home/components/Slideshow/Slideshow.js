import Create from 'images/Create.png'
import Monitor from 'images/Monitor.png'
import Update from 'images/Update.png'
import React from 'react'
import { SlideItems, Slidenav, Thumbnav } from './components'

const slides = [Create, Monitor, Update]

const Slideshow = () => (
	<div id='slideshow'>
		<div
			className='uk-position-relative uk-visible-toggle'
			data-uk-slideshow='ratio: 4:3'
		>
			<SlideItems {...{ slides }}/>
			<Thumbnav {...{ slides }}/>
			<Slidenav side='left'/>
			<Slidenav side='right'/>
		</div>
	</div>
)

export default Slideshow
