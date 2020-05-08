import AnimatedDiv from 'components/animated/AnimatedDiv'
import React from 'react'

const ButtonGroup = ({ children, className = '', padding = true, ...props }) => (
	<AnimatedDiv
		className={`
			uk-flex
			uk-flex-center
			uk-grid-small
			uk-child-width-1-2@s
			uk-child-width-1-3@m
			${padding ? 'padding' : ''}
			${className}
		`}
		{...props}
	>
		{children}
	</AnimatedDiv>
)

export default ButtonGroup
