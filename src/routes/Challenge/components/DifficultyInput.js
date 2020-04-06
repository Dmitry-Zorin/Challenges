import React from 'react'
import { SwitcherItem } from 'components/SwitcherItem'

export const DifficultyInput = ({ difficulty, handleChange }) => (
	<div className='uk-margin-medium'>
		Difficulty
		<ul className='uk-subnav uk-subnav-pill uk-child-width-1-3'>
			{['Easy', 'Medium', 'Hard'].map(d => (
				<SwitcherItem
					key={d}
					value={d}
					active={d === difficulty}
					onClick={() => handleChange('difficulty', d)}
				/>
			))}
		</ul>
	</div>
)
