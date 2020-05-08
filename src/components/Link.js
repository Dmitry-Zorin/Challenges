import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link as RouterLink } from '@reach/router'
import React from 'react'

const Link = ({ to = '', text, icon, right, ...props }) => (
	<RouterLink {...{ to, ...props }}>
		<p>
			{right && text}
			{icon && (
				<FontAwesomeIcon
					className={`icon-${right ? 'right' : 'left'}`}
					{...{ icon }}
				/>
			)}
			{!right && text}
		</p>
	</RouterLink>
)

export default Link
