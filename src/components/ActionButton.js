import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Margin } from 'uikit-react'

const ActionButton = ({ value, icon, ...props }) => (
	<Margin type='remove' className='uk-width-1-1 uk-width-1-2@s uk-width-1-3@m'>
		<button className='uk-button uk-button-primary uk-width-1-1' {...props}>
			<FontAwesomeIcon transform='shrink-3'{...{ icon }}/>
			{value}
		</button>
	</Margin>
)

export default ActionButton
