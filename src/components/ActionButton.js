import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedButton from 'components/animated/AnimatedButton'
import React from 'react'
import { Margin } from 'uikit-react'

const ActionButton = ({ value, icon, ...props }) => (
	<Margin type='remove' className='uk-width-1-1 uk-width-1-2@s uk-width-1-3@m'>
		<AnimatedButton className='uk-width-1-1' {...props} primary>
			<FontAwesomeIcon transform='shrink-3 down-1.25' {...{ icon }}/>
			{value}
		</AnimatedButton>
	</Margin>
)

export default ActionButton
