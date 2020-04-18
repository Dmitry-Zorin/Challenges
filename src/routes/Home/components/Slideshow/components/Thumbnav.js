import React from 'react'

const Thumbnav = ({ slides }) => (
	<div className='uk-position-bottom-center uk-hidden-hover'>
		<ul className='uk-thumbnav'>
			{slides.map((s, i) => (
				<li data-uk-slideshow-item={i}>
					<a href='/#'>
						<img src={s} width='75' alt=''/>
					</a>
				</li>
			))}
		</ul>
	</div>
)

export default Thumbnav
