import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HStack from 'components/HStack'
import UserContext from 'contexts/UserContext'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Header.module.scss'

const { header, large, title } = styles

const Header = () => {
	const { challenges } = useContext(UserContext)

	const isRoot = useLocation().pathname === '/'
	const isHomePage = isRoot && challenges && !challenges?.ongoing

	return (
		<header className={`${header} ${isHomePage ? large : ''}`}>
			<div className="uk-text-center uk-padding-small">
				<HStack className={`${title} uk-flex-center`}>
					<FontAwesomeIcon
						icon="tasks"
						className="uk-visible@s"
						transform="left-1"
					/>
					<p>Challenges</p>
				</HStack>
				{isHomePage && (
					<p className="uk-text-italic text-larger">
						A simple way to keep track of the challenges you set for yourself!
					</p>
				)}
			</div>
		</header>
	)
}

export default Header
