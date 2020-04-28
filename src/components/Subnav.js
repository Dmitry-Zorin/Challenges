import AnimatedSwitcherItem from 'components/animated/AnimatedSwitcherItem'
import React from 'react'

const Subnav = ({ items, className, ...props }) => (
	<ul
		className={`
			uk-subnav
			uk-subnav-pill
			uk-flex-center
			uk-margin-medium-bottom
			uk-child-width-1-${items.length}
			uk-child-width-1-3@m
			${className}
	`}
		{...props}
	>
		{items.map(itemProps => <AnimatedSwitcherItem {...itemProps}/>)}
	</ul>
)

export default Subnav
