import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Feature = ({ title, icon, children }) => (
	<div
		className='uk-flex uk-flex-column uk-flex-center uk-text-center'
		data-uk-margin
	>
		<p className='uk-text-capitalize uk-text-primary uk-text-bold text-larger'>
			<FontAwesomeIcon {...{ icon }}/>
			{title}
		</p>
		<p className='text-medium'>{children}</p>
	</div>
)

export default Feature
