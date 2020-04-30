import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedButton from 'components/animated/AnimatedButton'
import React from 'react'

const ActionButton = ({ value, icon, className = '', ...props }) => (
	<div className='uk-margin-remove uk-width-1-2@s uk-width-1-3@m'>
		<AnimatedButton className={`uk-width-1-1 ${className}`} {...props} primary>
			<FontAwesomeIcon transform='shrink-3 down-1' {...{ icon }}/>
			{value}
		</AnimatedButton>
	</div>
)

export default ActionButton
