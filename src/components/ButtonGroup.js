import AnimatedDiv from 'components/animated/AnimatedDiv'
import React from 'react'

const ButtonGroup = ({ children }) => (
	<AnimatedDiv
		className='uk-flex uk-flex-center uk-grid-small'
		style={{ marginTop: '3.5em' }}
	>
		{children}
	</AnimatedDiv>
)

export default ButtonGroup
