import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import React from 'react'

const NavLink = ({ text, icon, to = '', ...props }) => (
	<Link to={`/${to}`} {...props}>
		{icon && <FontAwesomeIcon transform='shrink-4 up-0.75' {...{ icon }}/>}
		{text}
	</Link>
)

export default NavLink
