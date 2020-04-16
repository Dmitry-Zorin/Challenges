import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import { DataContext } from 'contexts/DataContext'
import React, { useContext } from 'react'

export const NavItemRight = ({ location, transform }) => {
	const { userInfo } = useContext(DataContext)
	const inOrOut = userInfo?.username ? 'out' : 'in'
	
	return userInfo === undefined ? null
		: location.pathname.match(/\/($|create|edit)/) ? (
			<Link to='/login'>
				<FontAwesomeIcon icon={`sign-${inOrOut}-alt`} transform={transform}/>
				Log {inOrOut}
			</Link>
		) : (
			<Link to='/create'>
				<FontAwesomeIcon icon='plus' transform={transform}/>
				Create
			</Link>
		)
}
