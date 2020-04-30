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
		<AnimatedDiv className='uk-flex'>
			<p
				className={[
					'uk-width-expand',
					!extended && 'uk-text-truncate'
				].join(' ')}
			>
				{challenge.name}
			</p>
			<div className='uk-flex'>
				<p className='uk-text-meta'>
					<FontAwesomeIcon
						className='icon-right'
						transform={`shrink-4 down-${extended ? 2 : 0.75}`}
						{...{ icon }}
					/>
					{!isInfiniteTime && time}
				</p>
			</div>
		</AnimatedDiv>
	)
}

export default GroupItem
