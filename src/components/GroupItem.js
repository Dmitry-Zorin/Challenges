import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
	
	const style = extended ? '' : 'font-size-medium uk-text-truncate'
	
	return (
		<Flex className='uk-margin-small'>
			<div className={`${style} uk-width-expand`}>
				{challenge.name}
			</div>
			<Flex>
				<div className='uk-text-meta'>
					<FontAwesomeIcon
						icon={icon}
						className='icon-right'
						transform='shrink-3'
					/>
					{!isInfiniteTime && time}
				</div>
			</Flex>
		</Flex>
	)
}

export default GroupItem
