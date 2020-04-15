import React from 'react'
import { Card } from 'uikit-react'
import { Link } from '@reach/router'
import { Overlay } from './Overlay'
import { GroupItem } from 'components/GroupItem'
import { NoChallenges } from 'components/NoChallenges'

export const ChallengeGroup = ({ to, title, group = [] }) => (
	<Link to={to}>
		<Card className='uk-transition-toggle' style={{ height: '15em' }}>
			<p className='font-size-large uk-text-center uk-text-capitalize'>
				{title}
			</p>
			{group.length
				? group.slice(0, 4).map(c => (
					<GroupItem key={c._id} group={title} challenge={c}/>
				))
				: <NoChallenges/>
			}
			<Overlay text='see all'/>
		</Card>
	</Link>
)
