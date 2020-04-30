import DataContext from 'contexts/DataContext'
import { challengeGroups } from 'data/settings.json'
import React, { useContext, useEffect } from 'react'
import { ChallengeGroup, LeftColumn, NewChallengeButton } from './components'

const Dashboard = () => {
	const { challenges, setTitle } = useContext(DataContext)
	
	useEffect(() => setTitle(), [setTitle])
	
	return (
		<div className='uk-flex'>
			<LeftColumn/>
			<div className='uk-width-expand'>
				<NewChallengeButton/>
				{challengeGroups.map(g => (
					<ChallengeGroup key={g} title={g} group={challenges?.[g]}/>
				))}
			</div>
		</div>
	)
}

export default Dashboard
