import Link from 'components/Link'
import DataContext from 'contexts/DataContext'
import React, { useContext } from 'react'

const NavItemLeft = ({ location }) => {
	const { userInfo } = useContext(DataContext)
	const userIsAuthorized = !!userInfo?.username
	
	if (location.pathname !== '/') return (
		<Link icon='chevron-left' text={userIsAuthorized ? 'dashboard' : 'home'}/>
	)
	
	const text = 'Challenges'
	
	return (
		<>
			{userIsAuthorized && (
				<Link
					className='uk-hidden@m'
					icon='bars'
					data-uk-toggle='target: #info'
					{...{ text }}
				/>
			)}
			<Link className={userIsAuthorized ? 'uk-visible@m' : ''} {...{ text }}/>
		</>
	)
}

export default NavItemLeft
