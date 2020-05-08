import React from 'react'
import features from 'routes/Home/features'

const SlideItems = () => (
	<ul className='uk-slideshow-items'>
		{features.map(({ src, Component }) => (
			<li key={src} className='round-border'>
				<img src={src} alt=''/>
				<div
					className='
						uk-overlay
						uk-overlay-primary
						uk-position-top-right
						uk-position-small
						uk-visible@m
						uk-hidden-hover
						uk-transition-fade
						uk-width-1-3
						uk-text-center
						primary-border
					'
				>
					<Component/>
				</div>
			</li>
		))}
	</ul>
)

export default SlideItems
