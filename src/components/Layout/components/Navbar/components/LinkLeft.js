import Link from 'components/Link'
import UserContext from 'contexts/UserContext'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

const LinkLeft = () => {
	const { userInfo } = useContext(UserContext)
	const userIsAuthorized = !!userInfo?.username

	if (useLocation().pathname !== '/')
		return (
			<Link
				to="/"
				icon="chevron-left"
				text={userIsAuthorized ? 'dashboard' : 'home'}
			/>
		)

	const text = 'Challenges'

	return (
		<>
			{userIsAuthorized && (
				<Link
					to="/"
					className="uk-hidden@m"
					icon="bars"
					data-uk-toggle="target: #info"
					text={text}
				/>
			)}
			<Link
				to="/"
				className={userIsAuthorized ? 'uk-visible@m' : ''}
				text={text}
			/>
		</>
	)
}

export default LinkLeft
