import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import React from 'react'

const NavLink = ({ text, icon, to = '', ...props }) => (
	<Link to={`/${to}`} {...props}>
		{icon && <FontAwesomeIcon transform='shrink-3 down-0.5' {...{ icon }}/>}
		{text}
	</Link>
)

export default NavLink
