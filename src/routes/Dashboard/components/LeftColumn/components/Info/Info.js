import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import Animation from 'components/Animation'
import DataContext from 'contexts/DataContext'
import { challengeGroups } from 'data/settings.json'
import { upperFirst } from 'lodash'
import React, { useContext } from 'react'
import Settings from './components/Settings'

const Info = () => {
	const { userInfo, challenges } = useContext(DataContext)
	
	return !userInfo ? null : (
		<>
			<Animation type='fade'>
				<p className='uk-text-primary text-large uk-text-center'>
					<FontAwesomeIcon icon='user'/>
					{userInfo.username}
				</p>
			</Animation>
			<Animation type='fade'>
				<ul className='uk-list'>
					{challengeGroups.map(g => (
						<li key={g}>
							<Link to={`groups/${g}`} className='uk-flex'>
								<p className='uk-width-expand'>{upperFirst(g)}:</p>
								<p>{challenges[g].length}</p>
							</Link>
						</li>
					))}
				</ul>
			</Animation>
			<hr/>
			<Settings/>
		</>
	)
}

export default Info
