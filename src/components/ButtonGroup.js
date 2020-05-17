import React, { Children } from 'react'

const ButtonGroup = ({ padding = true, className = '', children, ...props }) => (
	<div
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
	</div>
)

export default ButtonGroup
