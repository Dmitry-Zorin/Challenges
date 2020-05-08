import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataContext from 'contexts/DataContext'
import React, { useContext } from 'react'
import { header, large, title } from './Header.module.scss'

const Header = ({ location }) => {
	const { challenges } = useContext(DataContext)
	
	const isRoot = location.pathname === '/'
	const isHomePage = isRoot && challenges && !challenges?.ongoing
	
	return (
		<header className={`${header} ${isHomePage ? large : ''}`}>
			<div className='uk-text-center uk-padding-small'>
				<p className={title}>
					<FontAwesomeIcon icon='tasks' className='uk-visible@s'/>
					Challenges
				</p>
				{isHomePage && (
					<p className='uk-text-light uk-text-italic text-larger'>
						A simple way to keep track of the challenges you set for yourself!
					</p>
				)}
			</div>
		</header>
	)
}

export default Header
