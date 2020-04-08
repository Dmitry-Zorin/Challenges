import React, { useContext } from 'react'
import { Flex } from 'uikit-react'
import { ChallengeGroup } from './components/ChallengeGroup'
import { LeftColumn } from './components/LeftColumn'
import { NewChallengeButton } from './components/NewChallengeButton'
import { DataContext } from 'contexts/DataContext'

export const Dashboard = () => {
	const context = useContext(DataContext)
	const challenges = context.challenges
	
	return (
		<Flex>
			<LeftColumn/>
			<div className='uk-width-expand uk-padding-remove-left'>
				<NewChallengeButton/>
				{['ongoing', 'upcoming', 'completed'].map(g => (
					<ChallengeGroup key={g} to={`/${g}`} title={g} group={challenges[g]}/>
				))}
			</div>
		</Flex>
	)
}
