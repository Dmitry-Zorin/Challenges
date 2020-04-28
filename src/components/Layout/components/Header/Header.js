import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataContext from 'contexts/DataContext'
import { upperFirst } from 'lodash'
import React, { useContext } from 'react'
import { Flex } from 'uikit-react'
import { header, large, title as titleStyle } from './Header.module.scss'

const Header = ({ location }) => {
	const { challenges, title } = useContext(DataContext)
	const isRoot = location.pathname === '/'
	const isHomePage = isRoot && challenges && !challenges?.ongoing
	const sizeStyle = isHomePage ? large : ''
	
	return (
		<Flex className={[header, sizeStyle].join(' ')}>
			<div className='uk-text-center'>
				<p className={[titleStyle, sizeStyle].join(' ')}>
					{!isRoot ? upperFirst(title) : (
						<>
							<FontAwesomeIcon
								icon='tasks'
								className='uk-visible@s'
								transform='shrink-3 down-1.5'
							/>
							Challenges
						</>
					)}
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
