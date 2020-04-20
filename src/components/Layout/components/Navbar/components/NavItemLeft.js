import DataContext from 'contexts/DataContext'
import React, { useContext } from 'react'
import { NavLink } from './'

const NavItemLeft = ({ location }) => {
	const { userInfo } = useContext(DataContext)
	const userIsAuthorized = !!userInfo?.username
	
	if (location.pathname !== '/') return (
		<NavLink
			icon='chevron-left'
			text={userIsAuthorized ? 'dashboard' : 'home'}
		/>
	)
	
	const text = 'Challenges'
	return (
		<>
			{userIsAuthorized && (
				<NavLink
					className='uk-hidden@m'
					icon='bars'
					data-uk-toggle='target: #info'
					{...{ text }}
				/>
			)}
			<NavLink
				className={userIsAuthorized ? 'uk-visible@m' : ''}
				{...{ text }}
			/>
		</>
	)
}

export default NavItemLeft
