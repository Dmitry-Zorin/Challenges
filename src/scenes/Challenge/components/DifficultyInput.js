import React from 'react'
import { SwitcherItem } from '../../../components/SwitcherItem'
import {
	faHiking,
	faRunning,
	faWalking,
} from '@fortawesome/free-solid-svg-icons'

const icons = {
	Easy: faHiking,
	Medium: faWalking,
	Hard: faRunning,
}

export const DifficultyInput = ({ difficulty, handleChange }) => (
	<div className='uk-margin-medium'>
		Difficulty
		<ul className='uk-subnav uk-subnav-pill uk-child-width-1-3'>
			{Object.entries(icons).map(([d, i]) => (
				<SwitcherItem
					key={d}
					icon={i}
					value={d}
					active={d === difficulty}
					onClick={() => handleChange('difficulty', d)}
				/>
			))}
		</ul>
	</div>
)
