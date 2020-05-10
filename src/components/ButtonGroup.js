import Animation from 'components/Animation'
import React, { Children } from 'react'

const ButtonGroup = ({ padding = true, className = '', children, ...props }) => (
	<Animation
		type='fade'
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
		{Children.map(children, (c, i) => c && (
			<div key={i}>{c}</div>
		))}
	</Animation>
)

export default ButtonGroup
