import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from '@reach/router'
import UserContext from 'contexts/UserContext'
import React, { useContext } from 'react'
import { header, large, title } from './Header.module.scss'

const Header = () => {
	const { challenges } = useContext(UserContext)
	
	const isRoot = useLocation().pathname === '/'
	const isHomePage = isRoot && challenges && !challenges?.ongoing
	
	return (
		<header className={`${header} ${isHomePage ? large : ''}`}>
			<div className='uk-text-center uk-padding-small'>
				<p className={title}>
					<FontAwesomeIcon
						icon='tasks'
						className='uk-visible@s'
						transform='down-0.4'
					/>
					Challenges
				</p>
				{isHomePage && (
					<p className='uk-text-italic text-larger'>
						A simple way to keep track of the challenges you set for yourself!
					</p>
				)}
			</div>
		</header>
	)
}

export default Header
