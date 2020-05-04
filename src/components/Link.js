import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link as RouterLink } from '@reach/router'
import React from 'react'

const Link = ({ to = '', text, icon, right = false, ...props }) => (
	<RouterLink {...{ to, ...props }}>
		{right && text}
		{icon && (
			<FontAwesomeIcon
				className={`icon-${right ? 'right' : 'left'}`}
				{...{ icon }}
			/>
		)}
		{!right && text}
	</RouterLink>
)

export default Link
