import { useLocation } from '@reach/router'
import Link from 'components/Link'
import UserContext from 'contexts/UserContext'
import React, { useContext } from 'react'

const LinkRight = () => {
	const { userInfo } = useContext(UserContext)
	const { pathname } = useLocation()
	
	if (!userInfo) return null
	
	if (!pathname.match(/\/($|create|edit)/))
		return <Link to='create' text='create' icon='plus'/>
	
	const inOrOut = userInfo?.username ? 'out' : 'in'
	return (
		<Link to='login' text={`log ${inOrOut}`} icon={`sign-${inOrOut}-alt`}/>
	)
}

export default LinkRight
