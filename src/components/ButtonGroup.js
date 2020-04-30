import AnimatedDiv from 'components/animated/AnimatedDiv'
import React from 'react'

const ButtonGroup = ({ children, className = '', ...props }) => (
	<AnimatedDiv
		className={`uk-flex uk-flex-center uk-grid-small ${className}`}
		{...props}
	>
		{children}
	</AnimatedDiv>
)

export default ButtonGroup
