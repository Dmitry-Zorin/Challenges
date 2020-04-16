import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import { DataContext } from 'contexts/DataContext'
import { challengeGroups } from 'data/settings.json'
import { capitalize } from 'lodash'
import React, { useContext } from 'react'
import { List, ListItem } from 'uikit-react'

export const Info = () => {
	const { userInfo, challenges } = useContext(DataContext)
	
	return userInfo === undefined ? null : userInfo.username ? (
		<div>
			<p className='font-size-large uk-text-center'>
				<FontAwesomeIcon icon='user' transform='shrink-4'/>
				{userInfo.username}
			</p>
			<List>
				{challengeGroups.map(g => (
					<ListItem key={g}>
						<Link to={`/${g}`}>
							{`${capitalize(g)}: ${challenges[g].length}`}
						</Link>
					</ListItem>
				))}
			</List>
		</div>
	) : (
		<p className='font-size-large uk-text-center uk-text-muted'>
			<FontAwesomeIcon icon='user-slash' transform='shrink-4'/>
			No info...
		</p>
	)
}
