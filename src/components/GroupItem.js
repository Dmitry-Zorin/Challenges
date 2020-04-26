import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedDiv from 'components/animated/AnimatedDiv'
import { infinity } from 'data/settings.json'
import React from 'react'
import { getChallengeTime } from 'scripts/time'
import { Flex } from 'uikit-react'

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
		<AnimatedDiv
			className='uk-flex uk-margin-small'
			key={challenge._id}
			positionTransition
		>
			<p
				className={`
						${extended ? '' : 'text-medium uk-text-truncate'}
						uk-width-expand
					`}
			>
				{challenge.name}
			</p>
			<Flex>
				<p className='uk-text-meta'>
					<FontAwesomeIcon
						className='icon-right'
						transform='shrink-4 down-0.75'
						{...{ icon }}
					/>
					{!isInfiniteTime && time}
				</p>
			</Flex>
		</AnimatedDiv>
	)
}

export default GroupItem
