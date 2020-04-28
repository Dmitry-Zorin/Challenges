import { Link } from '@reach/router'
import AnimatedCard from 'components/animated/AnimatedCard'
import GroupItem from 'components/GroupItem'
import NoChallenges from 'components/NoChallenges'
import { upperFirst } from 'lodash'
import React from 'react'
import Overlay from './Overlay'

const ChallengeGroup = ({ title, group = [] }) => (
	<Link to={`/groups/${title}`}>
		<AnimatedCard className='uk-transition-toggle'>
			<p className='uk-text-primary text-large uk-text-center'>
				{upperFirst(title)}
			</p>
			{!group.length ? <NoChallenges/> : (
				group.slice(0, 4).map(c => (
					<GroupItem key={c._id} group={title} challenge={c}/>
				))
			)}
			<Overlay text='see all'/>
		</AnimatedCard>
	</Link>
)

export default ChallengeGroup
