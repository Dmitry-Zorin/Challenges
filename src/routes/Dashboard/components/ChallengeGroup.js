import { Link } from '@reach/router'
import AnimatedCard from 'components/Animated/AnimatedCard/AnimatedCard'
import GroupItem from 'components/GroupItem'
import NoChallenges from 'components/NoChallenges'
import { upperFirst } from 'lodash'
import React from 'react'
import Overlay from './Overlay'

const ChallengeGroup = ({ to, title, group = [] }) => (
	<Link {...{ to }}>
		<AnimatedCard className='uk-transition-toggle' style={{ height: '15em' }}>
			<p className='text-secondary font-size-large uk-text-center'>
				{upperFirst(title)}
			</p>
			{!group.length ? <NoChallenges/>
				: group.slice(0, 4).map(c => (
					<GroupItem key={c._id} group={title} challenge={c}/>
				))
			}
			<Overlay text='see all'/>
		</AnimatedCard>
	</Link>
)

export default ChallengeGroup
