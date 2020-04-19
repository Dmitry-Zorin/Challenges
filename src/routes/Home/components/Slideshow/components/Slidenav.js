import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Slidenav = ({ side }) => (
	<a
		href='/#'
		className={`uk-visible@s uk-hidden-hover uk-position-center-${side} uk-width-1-5 uk-height-1-1`}
		data-uk-slideshow-item={side === 'left' ? 'previous' : 'next'}
	>
		<FontAwesomeIcon
			icon={`chevron-${side}`}
			className='uk-position-center'
			size='2x'
		/>
	</a>
)

export default Slidenav
