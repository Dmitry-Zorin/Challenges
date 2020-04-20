import DataContext from 'contexts/DataContext'
import React, { useContext } from 'react'
import { NavLink } from './'

const NavItemRight = ({ location }) => {
	const { userInfo } = useContext(DataContext)
	if (userInfo === undefined) return null
	
	if (!location.pathname.match(/\/($|create|edit)/))
		return <NavLink to='create' text='create' icon='plus'/>
	
	const inOrOut = userInfo?.username ? 'out' : 'in'
	return (
		<NavLink to='login' text={`log ${inOrOut}`} icon={`sign-${inOrOut}-alt`}/>
	)
}

export default NavItemRight
