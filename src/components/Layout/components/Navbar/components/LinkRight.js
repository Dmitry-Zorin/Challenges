import Link from 'components/Link'
import DataContext from 'contexts/DataContext'
import React, { useContext } from 'react'

const LinkRight = ({ location }) => {
	const { userInfo } = useContext(DataContext)
	if (!userInfo) return null
	
	if (!location.pathname.match(/\/($|create|edit)/))
		return <Link to='create' text='create' icon='plus'/>
	
	const inOrOut = userInfo?.username ? 'out' : 'in'
	return (
		<Link to='login' text={`log ${inOrOut}`} icon={`sign-${inOrOut}-alt`}/>
	)
}

export default LinkRight
