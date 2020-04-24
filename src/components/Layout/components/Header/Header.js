import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataContext from 'contexts/DataContext'
import { upperFirst } from 'lodash'
import React, { useContext } from 'react'
import { Flex } from 'uikit-react'
import { header, headerLarge, title, titleLarge } from './Header.module.scss'

const Header = ({ location }) => {
	const { challenges } = useContext(DataContext)
	const isHomePage = location.pathname === '/' && !challenges?.ongoing
	
	return (
		<Flex className={isHomePage ? headerLarge : header}>
			<div className='uk-text-center'>
				<p className={isHomePage ? titleLarge : title}>
					<FontAwesomeIcon
						icon='tasks'
						className='uk-visible@s'
						transform='shrink-3 down-1'
					/>
					{upperFirst(location.pathname.slice(1) || 'challenges')}
				</p>
				{isHomePage && (
					<p className='text-larger uk-text-italic uk-text-light uk-padding'>
						A simple way to keep track of the challenges you set for yourself!
					</p>
				)}
			</div>
		</Flex>
	)
}

export default Header
