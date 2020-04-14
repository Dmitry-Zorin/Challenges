import React from 'react'
import { Card } from 'uikit-react'
import { Link } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Overlay } from './Overlay'
import { GroupItem } from 'components/ChallengeGroupItem'

export const ChallengeGroup = ({ to, title, group = [] }) => (
	<Link to={to}>
		<Card className='uk-transition-toggle' style={{ height: '15em' }}>
			<p className='font-size-large uk-text-center uk-text-capitalize'>
				{title}
			</p>
			{group.length ? group.slice(0, 4).map(c => (
				<GroupItem key={c._id} group={title} challenge={c}/>
			)) : (
				<p
					className='uk-text-center uk-text-muted'
					style={{ marginTop: '4em' }}
				>
					<FontAwesomeIcon
						icon='ban'
						className='icon-left'
						transform='shrink-4 down-0.4'
					/>
					No challenges...
				</p>
			)}
			<Overlay text='see all'/>
		</Card>
	</Link>
)
