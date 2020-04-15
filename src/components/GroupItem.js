import React from 'react'
import { getChallengeTime } from 'scripts/time'
import { infinity } from 'data/settings.json'
import { Flex, Grid } from 'uikit-react'
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
		<Grid className={extended ? '' : 'uk-margin-small'}>
			<div className={`
				${extended ? '' : 'font-size-medium uk-text-truncate'} uk-width-expand
			`}>
				{challenge.name}
			</div>
			<Flex>
				<div className='uk-text-meta'>
					<FontAwesomeIcon icon={icon} transform='shrink-3'/>
					{!isInfiniteTime && time}
				</div>
			</Flex>
		</Grid>
	)
}
