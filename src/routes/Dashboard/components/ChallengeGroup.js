import GroupItem from 'components/GroupItem'
import NoChallenges from 'components/NoChallenges'
import { upperFirst } from 'lodash'
import React from 'react'
import Overlay from './Overlay'

const ChallengeGroup = ({ title, group = [] }) => (
	<Overlay to={`groups/${title}`} text='see all'>
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
	</Overlay>
)

export default ChallengeGroup
