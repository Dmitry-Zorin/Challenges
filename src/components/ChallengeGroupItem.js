import React from 'react'
import { getChallengeTime } from 'scripts/time'
import { infinity } from 'data/settings.json'
import { Grid } from 'uikit-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const icons = {
	ongoing: 'arrow-down',
	upcoming: 'arrow-up',
	completed: 'check',
}

export const GroupItem = ({ group, challenge, extended = false }) => {
	const time = getChallengeTime(challenge)
	const isInfiniteTime = time === infinity
	
	const icon = isInfiniteTime ? 'question'
		: time || group === 'completed'
		? icons[group] : 'exclamation'
	
	return (
		<Grid className={!extended && 'uk-margin-small'}>
			<div className={`
				${extended ? '' : 'font-size-medium uk-text-truncate'} uk-width-expand
			`}>
				{challenge.name}
			</div>
			<div
				className='uk-text-meta uk-padding-remove'
				style={{ marginTop: `0.3${extended ? 5 : 0}em` }}
			>
				<FontAwesomeIcon icon={icon} transform='shrink-3'/>
				{!isInfiniteTime && time}
			</div>
		</Grid>
	)
}
