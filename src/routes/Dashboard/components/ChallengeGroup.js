import { GroupItem, NoChallenges } from 'components'
import { upperFirst } from 'lodash'
import React from 'react'
import Overlay from './Overlay'

const ChallengeGroup = ({ title, group = [] }) => (
	<Overlay to={`groups/${title}`} text='see all'>
		<p className='uk-text-primary uk-text-center text-medium'>
			{upperFirst(title)}
		</p>
		{!group.length ? (
			<NoChallenges/>
		) : (
			<ul className='uk-list'>
				{group.slice(0, 4).map(c => (
					<li key={c._id}>
						<GroupItem group={title} challenge={c}/>
					</li>
				))}
			</ul>
		)}
	</Overlay>
)

export default ChallengeGroup
