import { Link } from '@reach/router'
import AnimatedCard from 'components/animated/AnimatedCard'
import GroupItem from 'components/GroupItem'
import NoChallenges from 'components/NoChallenges'
import { upperFirst } from 'lodash'
import React, { useState } from 'react'
import Overlay from './Overlay'

const ChallengeGroup = ({ title, group = [] }) => {
	const [overlayIsVisible, setOverlayIsVisible] = useState(false)
	
	return (
		<Link to={`/groups/${title}`}>
			<AnimatedCard
				onMouseEnter={() => setOverlayIsVisible(true)}
				onMouseLeave={() => setOverlayIsVisible(false)}
			>
				<p className='uk-text-primary text-large uk-text-center'>
					{upperFirst(title)}
				</p>
				<div className='text-medium' data-uk-margin>
					{!group.length ? <NoChallenges/> : (
						group.slice(0, 4).map(c => (
							<GroupItem key={c._id} group={title} challenge={c}/>
						))
					)}
				</div>
				<Overlay text='see all' isVisible={overlayIsVisible}/>
			</AnimatedCard>
		</Link>
	)
}

export default ChallengeGroup
