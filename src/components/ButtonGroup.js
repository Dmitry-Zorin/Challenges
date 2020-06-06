import React, { Children } from 'react'

const ButtonGroup = ({ padding = true, className = '', children, subnav, ...props }) => (
	<div className={padding ? 'padding' : ''}>
		<div
			className={`
				uk-flex
				uk-flex-center
				uk-child-width-1-2@s
				uk-child-width-1-3@m
				${subnav ? '' : 'uk-grid-small'}
				${className}
			`}
			//style={{ overflowY: 'hidden' }}
			{...props}
		>
			{Children.map(children, (c, i) => c && (
				<div key={i}>{c}</div>
			))}
		</div>
	</div>
)

export default ButtonGroup
