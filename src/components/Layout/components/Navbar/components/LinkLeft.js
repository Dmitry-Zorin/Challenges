import { useLocation } from '@reach/router'
import Link from 'components/Link'
import UserContext from 'contexts/UserContext'
import React, { useContext } from 'react'

const LinkLeft = () => {
	const { userInfo } = useContext(UserContext)
	const userIsAuthorized = !!userInfo?.username
	
	if (useLocation().pathname !== '/') return (
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

export default LinkLeft
