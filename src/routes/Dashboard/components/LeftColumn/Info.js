import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HStack } from 'components'
import UserContext from 'contexts/UserContext'
import settings from 'data/settings.json'
import { upperFirst } from 'lodash'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const Info = () => {
	const { userInfo, challenges } = useContext(UserContext)

	return (
		<div className="uk-grid-row-large" data-uk-margin>
			<HStack className="uk-text-primary uk-flex-center uk-text-bold text-large">
				<FontAwesomeIcon icon="user" />
				{userInfo?.username || '...'}
			</HStack>
			<ul className="uk-list">
				{settings.challengeGroups.map((g) => (
					<li key={g} style={{ lineHeight: 2.25 }}>
						<Link to={`/groups/${g}`} className="uk-flex">
							<p className="uk-width-expand">{upperFirst(g)}:</p>
							{challenges[g].length}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Info
