import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link as RouterLink } from '@reach/router'
import React from 'react'

const Link = ({ to = '', text, icon, right = false, ...props }) => (
	<RouterLink to={`/${to}`} {...props}>
		<p>
			{right && text}
			{icon && (
				<FontAwesomeIcon
					className={`icon-${right ? 'right' : 'left'}`}
					transform='shrink-4 down-1.1'
					{...{ icon }}
				/>
			)}
			{!right && text}
		</p>
	</RouterLink>
)

export default Link
