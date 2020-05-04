import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Link'
import DataContext from 'contexts/DataContext'
import { challengeGroups } from 'data/settings.json'
import { upperFirst } from 'lodash'
import React, { useContext } from 'react'
import Settings from './components/Settings'

const Info = () => {
	const { userInfo, challenges } = useContext(DataContext)
	
	return !userInfo ? null : (
		<>
			<p className='uk-text-primary text-large uk-text-center'>
				<FontAwesomeIcon icon='user'/>
				{userInfo.username}
			</p>
			<ul className='uk-list'>
				{challengeGroups.map(g => (
					<li key={g}>
						<Link
							to={`groups/${g}`}
							className='text'
							text={`${upperFirst(g)}: ${challenges[g].length}`}
						/>
					</li>
				))}
			</ul>
			<Settings/>
		</>
	)
}

export default Info
