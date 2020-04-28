import AnimatedDiv from 'components/animated/AnimatedDiv'
import React from 'react'

const ButtonGroup = ({ children, className, style, ...props }) => (
	<AnimatedDiv
		className={`uk-flex uk-flex-center uk-grid-small ${className}`}
		style={{ marginTop: '3.5em', ...style }}
		{...props}
	>
		{children}
	</AnimatedDiv>
)

export default ButtonGroup
