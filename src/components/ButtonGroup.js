import AnimatedDiv from 'components/animated/AnimatedDiv'
import React from 'react'

const ButtonGroup = ({ children, className = '', padding = false, ...props }) => (
	<AnimatedDiv
		className={[
			'uk-flex',
			'uk-flex-center',
			'uk-grid-small',
			padding && 'uk-padding-small',
			className,
		].join(' ')}
		{...props}
	>
		{children}
	</AnimatedDiv>
)

export default ButtonGroup
