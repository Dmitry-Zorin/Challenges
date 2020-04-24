import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import DataContext from 'contexts/DataContext'
import { challengeGroups } from 'data/settings.json'
import { upperFirst } from 'lodash'
import React, { useContext } from 'react'
import { List, ListItem } from 'uikit-react'

const Info = () => {
	const { userInfo, challenges } = useContext(DataContext)
	
	return userInfo === undefined ? null : (
		<>
			<p className='uk-text-primary text-large uk-text-center'>
				<FontAwesomeIcon icon='user' transform='shrink-5 down-0.5'/>
				{userInfo.username}
			</p>
			<List>
				{challengeGroups.map(g => (
					<ListItem key={g}>
						<Link to={`/${g}`}>
							{`${upperFirst(g)}: ${challenges[g].length}`}
						</Link>
					</ListItem>
				))}
			</List>
		</>
	)
}

export default Info
