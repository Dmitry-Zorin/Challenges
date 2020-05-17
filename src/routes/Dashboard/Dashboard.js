import UserContext from 'contexts/UserContext'
import { challengeGroups } from 'data/settings.json'
import React, { useContext } from 'react'
import { ChallengeGroup, LeftColumn, NewChallengeButton } from './components'

const Dashboard = () => {
	const { challenges } = useContext(UserContext)
	
	return (
		<div className='uk-flex'>
			<LeftColumn/>
			<div className='uk-width-expand text-medium'>
				<NewChallengeButton/>
				{challengeGroups.map(g => (
					<ChallengeGroup key={g} title={g} group={challenges?.[g]}/>
				))}
			</div>
		</div>
	)
}

export default Dashboard
