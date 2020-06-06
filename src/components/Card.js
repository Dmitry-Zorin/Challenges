import React from 'react'

const Card = ({ large, className = '', children, ...props }) => (
	<div
		className={`
			uk-card
			uk-card-default
			uk-card-body
			${large ? 'large' : ''}
			${className}
		`}
		{...props}
	>
		{children}
	</div>
)

export default Card
