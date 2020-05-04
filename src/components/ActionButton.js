import AnimatedButton from 'components/animated/AnimatedButton'
import React from 'react'

const ActionButton = ({ value, icon, className = '', ...props }) => (
	<div className='uk-margin-remove uk-width-1-2@s uk-width-1-3@m'>
		<AnimatedButton
			className={`uk-width-1-1 ${className}`}
			{...{ icon, value, ...props }}
			primary
		/>
	</div>
)

export default ActionButton
