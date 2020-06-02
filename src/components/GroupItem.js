import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React from 'react'
import { getChallengeTime } from 'scripts/time'

const icons = {
	ongoing: 'arrow-down',
	upcoming: 'arrow-up',
	completed: 'check',
}

const GroupItem = ({ group, challenge, active, extended }) => {
	const time = getChallengeTime(challenge)
	const isInfiniteTime = time === 'infinity'
	
	const icon = isInfiniteTime ? 'question'
		: time || group === 'completed'
			? icons[group] : 'exclamation'
	
	return (
		<motion.div
			className='uk-flex uk-flex-middle'
			exit={{height: 0, opacity: 0}}
			transition={{ ease: 'easeOut' }}
			//animate
		>
			<p
				className={`
					uk-width-expand
					${extended ? 'padding' : 'uk-text-truncate'}
					${active ? 'uk-text-primary' : ''}
				`}
			>
				{challenge.name}
			</p>
			<p className='text-meta'>
				<FontAwesomeIcon className='icon-right' {...{ icon }}/>
				{!isInfiniteTime && time}
			</p>
		</motion.div>
	)
}

export default GroupItem
