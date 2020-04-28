import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Link'
import DataContext from 'contexts/DataContext'
import { challengeGroups } from 'data/settings.json'
import { upperFirst } from 'lodash'
import React, { useContext } from 'react'
import { List } from 'uikit-react'

const Info = () => {
	const { userInfo, challenges } = useContext(DataContext)
	
	return !userInfo ? null : (
		<>
			<p className='uk-text-primary text-large uk-text-center'>
				<FontAwesomeIcon icon='user' transform='shrink-5 down-0.5'/>
				{userInfo.username}
			</p>
			<List>
				{challengeGroups.map(g => (
					<li key={g}>
						<Link to={`groups/${g}`} text={`${upperFirst(g)}: ${challenges[g].length}`}/>
					</li>
				))}
			</List>
		</>
	)
}

export default Info
