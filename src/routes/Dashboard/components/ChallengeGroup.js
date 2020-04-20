import { Link } from '@reach/router'
import GroupItem from 'components/GroupItem'
import NoChallenges from 'components/NoChallenges'
import { upperFirst } from 'lodash'
import React from 'react'
import { Card } from 'uikit-react'
import Overlay from './Overlay'

const ChallengeGroup = ({ to, title, group = [] }) => (
	<Link {...{ to }}>
		<Card className='uk-transition-toggle' style={{ height: '15em' }}>
			<p className='font-size-large uk-text-center'>
				{upperFirst(title)}
			</p>
			{!group.length ? <NoChallenges/>
				: group.slice(0, 4).map(c => (
					<GroupItem key={c._id} group={title} challenge={c}/>
				))
			}
			<Overlay text='see all'/>
		</Card>
	</Link>
)

export default ChallengeGroup
