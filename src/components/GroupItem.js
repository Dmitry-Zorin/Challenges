import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedDiv from 'components/animated/AnimatedDiv'
import { infinity } from 'data/settings.json'
import React from 'react'
import { getChallengeTime } from 'scripts/time'

const icons = {
	ongoing: 'arrow-down',
	upcoming: 'arrow-up',
	completed: 'check',
}

const GroupItem = ({ group, challenge, extended }) => {
	const time = getChallengeTime(challenge)
	const isInfiniteTime = time === infinity
	
	const icon = isInfiniteTime ? 'question'
		: time || group === 'completed'
			? icons[group] : 'exclamation'
	
	return (
		<AnimatedDiv className='uk-flex uk-flex-middle'>
			<p className={`
				uk-width-expand
				${extended ? 'padding' : 'uk-text-truncate'}
			`}>
				{challenge.name}
			</p>
			<p className='text-meta'>
				<FontAwesomeIcon className='icon-right' {...{ icon }}/>
				{!isInfiniteTime && time}
			</p>
		</AnimatedDiv>
	)
}

export default GroupItem
