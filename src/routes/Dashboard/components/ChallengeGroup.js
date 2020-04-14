import React from 'react'
import { Card, Grid } from 'uikit-react'
import { Link } from '@reach/router'
import { getChallengeTime } from 'scripts/time'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Overlay } from './Overlay'
import { infinity } from 'data/settings.json'

export const ChallengeGroup = ({ to, title, group = [] }) => (
	<Link to={to}>
		<Card className='uk-transition-toggle' style={{ height: '15em' }}>
			<p className='font-size-large uk-text-center uk-text-capitalize'>{title}</p>
			{group.length ? group.slice(0, 4).map(c => (
				<ChallengeGroupItem key={c._id} group={title} challenge={c}/>
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

const icons = {
	ongoing: 'arrow-down',
	upcoming: 'arrow-up',
	completed: 'check',
}

const ChallengeGroupItem = ({ group, challenge }) => {
	const time = getChallengeTime(challenge)
	const isInfiniteTime = time === infinity
	
	return (
		<Grid className='uk-margin-small' key={challenge._id}>
			<div className='font-size-medium uk-width-expand uk-text-truncate'>
				{challenge.name}
			</div>
			<div
				className='uk-text-meta uk-padding-remove'
				style={{ marginTop: '0.3em' }}
			>
				<FontAwesomeIcon
					icon={
						time && !isInfiniteTime || group === 'completed' ? icons[group]
							: isInfiniteTime ? 'infinity' : 'exclamation'
					}
					transform='shrink-3'
				/>
				{!isInfiniteTime && time}
			</div>
		</Grid>
	)
}
