import UserContext from 'contexts/UserContext'
import settings from 'data/settings.json'
import { useContext } from 'react'
import { ChallengeGroup, CreateChallengeButton, LeftColumn } from './components'

const Dashboard = () => {
	const { challenges } = useContext(UserContext)

	return (
		<div className="uk-flex">
			<LeftColumn />
			<div className="uk-width-expand text-medium">
				<CreateChallengeButton />
				{settings.challengeGroups.map((g) => (
					<ChallengeGroup key={g} title={g} group={challenges?.[g]} />
				))}
			</div>
		</div>
	)
}

export default Dashboard
