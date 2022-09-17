import { GroupItem, NoChallenges } from 'components'
import { upperFirst } from 'lodash'

import CardLink from './CardLink'

const ChallengeGroup = ({ title, group = [] }) => (
	<CardLink to={`/groups/${title}`} text="View More">
		<p className="uk-text-primary uk-text-center uk-text-bold text-large">
			{upperFirst(title)}
		</p>
		{!group.length ? (
			<NoChallenges />
		) : (
			<ul className="uk-list">
				{group.slice(0, 4).map((c) => (
					<li key={c._id}>
						<GroupItem group={title} challenge={c} />
					</li>
				))}
			</ul>
		)}
	</CardLink>
)

export default ChallengeGroup
