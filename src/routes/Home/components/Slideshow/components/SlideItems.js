import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import React from 'react'
import features from 'routes/Home/data/features'

const SlideItems = () => (
	<ul className='uk-slideshow-items'>
		{features.map(({ src, title, icon, component }) => (
			<li key={src} className='round-border'>
				<img src={src} alt=''/>
				<div
					className='
						uk-visible@m
						uk-overlay
						uk-overlay-primary
						uk-position-top-right
						uk-position-small
						uk-hidden-hover
						uk-transition-fade
						uk-width-1-3
						uk-text-center
						primary-border
					'
				>
					<p className='uk-text-primary font-size-large'>
						<FontAwesomeIcon transform='shrink-3' {...{ icon }}/>
						{upperFirst(title)}
					</p>
					<p className='font-size-medium'>
						{component()}
					</p>
				</div>
			</li>
		))}
	</ul>
)

export default SlideItems
