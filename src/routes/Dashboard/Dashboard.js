import React, { useContext } from 'react'
import { Flex } from 'uikit-react'
import { ChallengeGroup } from './components/ChallengeGroup'
import { LeftColumn } from './components/LeftColumn'
import { NewChallengeButton } from './components/NewChallengeButton'
import { DataContext } from 'contexts/DataContext'
import { challengeGroups } from 'data/settings.json'

export const Dashboard = () => {
	const { challenges } = useContext(DataContext)
	return (
		<Flex>
			<LeftColumn/>
			<div className='uk-width-expand uk-padding-remove-left'>
				<NewChallengeButton/>
				{challengeGroups.map(g => (
					<ChallengeGroup
						key={g}
						title={g}
						to={`/${g}`}
						group={challenges?.[g]}
					/>
				))}
			</div>
		</Flex>
	)
}
