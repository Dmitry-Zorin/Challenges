import Link from 'components/Link'
import { upperFirst } from 'lodash'
import React from 'react'

const SideLink = ({ to = '', side }) => (
	<Link
		className={`uk-padding-remove-${side}`}
		text={upperFirst(to)}
		icon={`chevron-${side}`}
		right={side === 'right'}
		{...{ to }}
	/>
)

export default SideLink
