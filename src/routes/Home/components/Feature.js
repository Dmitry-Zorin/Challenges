import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Feature = ({ children, title, icon }) => (
	<div className='uk-text-center'>
		<div className='uk-flex uk-flex-column uk-flex-center' data-uk-margin>
			<p className='uk-text-capitalize uk-text-primary uk-text-bold text-larger'>
				<FontAwesomeIcon {...{ icon }}/>
				{title}
			</p>
			<p className='text-medium'>{children}</p>
		</div>
	</div>
)

export default Feature
