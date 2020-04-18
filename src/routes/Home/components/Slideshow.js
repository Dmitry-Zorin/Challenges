import create from 'images/create.png'
import React from 'react'
import { Card } from 'uikit-react'

const Slideshow = () => (
	<Card id='slideshow'>
		<div
			className='uk-position-relative uk-visible-toggle'
			data-uk-slideshow='ratio: 25:17'
		>
			<ul className='uk-slideshow-items'>
				<ImgItem src={create}/>
				<ImgItem src={create}/>
			</ul>
			<a
				href='/#'
				className='uk-position-center-left uk-position-small uk-hidden-hover'
				data-uk-slidenav-previous
				data-uk-slideshow-item='previous'
			>
				right
			</a>
			<a
				href='/#'
				className='uk-position-center-right uk-position-small uk-hidden-hover'
				data-uk-slidenav-next
				data-uk-slideshow-item='next'
			>
			</a>
			<ul className='uk-slideshow-nav uk-dotnav uk-flex-center uk-margin'/>
		</div>
	</Card>
)

const ImgItem = (props) => (
	<li>
		<img className='uk-responsive-width' alt='' {...props} data-uk-cover/>
	</li>
)

export default Slideshow
