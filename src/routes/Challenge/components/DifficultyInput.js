import { SwitcherItem } from 'components/SwitcherItem'
import React from 'react'

export const DifficultyInput = ({ difficulty, setState }) => (
	<div className='uk-margin-medium'>
		Difficulty
		<ul
			className='uk-subnav uk-subnav-pill uk-child-width-1-3'
			style={{ marginTop: '0.5em' }}
		>
			{['Easy', 'Medium', 'Hard'].map(d => (
				<SwitcherItem
					key={d}
					value={d}
					active={d === difficulty}
					onClick={() => setState(d)}
				/>
			))}
		</ul>
	</div>
)
