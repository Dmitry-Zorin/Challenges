import React, { useContext } from 'react'
import { Flex } from 'uikit-react'
import { ChallengeGroup } from './components/ChallengeGroup'
import { LeftColumn } from './components/LeftColumn'
import { NewChallengeButton } from './components/NewChallengeButton'
import { DataContext } from '../../services/contexts/DataContext'

export const Dashboard = () => {
	const context = useContext(DataContext)
	const challenges = context.challenges

	return (
		<Flex>
			<LeftColumn/>
			<div className='uk-width-expand uk-padding-remove-left'>
				<NewChallengeButton/>
				<ChallengeGroup
					to='/ongoing'
					title='Ongoing'
					group={challenges.ongoing}
				/>
				<ChallengeGroup
					to='/upcoming'
					title='Upcoming'
					group={challenges.upcoming}
				/>
				<ChallengeGroup
					to='/completed'
					title='Completed'
					group={challenges.completed}
				/>
			</div>
		</Flex>
	)
}
