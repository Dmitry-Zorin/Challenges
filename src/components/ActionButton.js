import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedButton from 'components/Animated/AnimatedButton/AnimatedButton'
import React from 'react'
import { Margin } from 'uikit-react'

const ActionButton = ({ value, icon, ...props }) => (
	<Margin type='remove' className='uk-width-1-1 uk-width-1-2@s uk-width-1-3@m'>
		<AnimatedButton className='uk-button-primary uk-width-1-1' {...props}>
			<FontAwesomeIcon transform='shrink-3 down-0.75' {...{ icon }}/>
			{value}
		</AnimatedButton>
	</Margin>
)

export default ActionButton
