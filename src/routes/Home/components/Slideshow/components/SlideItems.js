import React from 'react'

const SlideItems = ({ slides }) => (
	<ul className='uk-slideshow-items'>
		{slides.map(s => (
			<li>
				<img src={s} alt=''/>
			</li>
		))}
	</ul>
)

export default SlideItems
