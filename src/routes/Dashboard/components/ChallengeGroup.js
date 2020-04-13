import React from 'react'
import { Card, Grid } from 'uikit-react'
import { Link } from '@reach/router'
import { getChallengeTime } from 'scripts/time'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowDown,
	faArrowUp,
	faBan,
	faCheck,
	faQuestion,
} from '@fortawesome/free-solid-svg-icons'
import { capitalize } from 'lodash'
import { Overlay } from './Overlay'

export const ChallengeGroup = ({ to, title, group = [] }) => (
	<Link to={to}>
		<Card className='uk-transition-toggle' style={{ height: '15em' }}>
			<p className='font-size-large uk-text-center'>{capitalize(title)}</p>
			{group.length ? group.slice(0, 4).map(c => (
				<ChallengeGroupItem key={c._id} group={title} challenge={c}/>
			)) : (
				<p
					className='uk-text-center uk-text-muted'
					style={{ marginTop: '4em' }}
				>
					<FontAwesomeIcon
						icon={faBan}
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
	'ongoing': faArrowDown,
	'upcoming': faArrowUp,
	'completed': faCheck,
}

const ChallengeGroupItem = ({ group, challenge }) => {
	const time = getChallengeTime(challenge)
	return (
		<Grid className='uk-margin-small' key={challenge._id}>
			<div className='wrap font-size-medium uk-width-expand'>
				{challenge.name}
			</div>
			<div
				className='uk-text-meta uk-padding-remove'
				style={{ marginTop: '0.3em' }}
			>
				<FontAwesomeIcon
					icon={
						time || group === 'completed' ? icons[group] : faQuestion
					}
					transform='shrink-3'
				/>
				{time}
			</div>
		</Grid>
	)
}
