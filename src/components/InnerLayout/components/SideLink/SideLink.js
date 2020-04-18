import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import { upperFirst } from 'lodash'
import React from 'react'
import { link } from './SideLink.module.scss'

const SideLink = ({ to, side }) => {
	const linkText = upperFirst(to.slice(1))
	return (
		<Link className={`${link} uk-text-${side}`} {...{ to }}>
			{side === 'right' && linkText}
			<FontAwesomeIcon
				icon={`chevron-${side}`}
				className={`icon-${side}`}
				transform='shrink-3 down-0.5'
			/>
			{side === 'left' && linkText}
		</Link>
	)
}

export default SideLink
