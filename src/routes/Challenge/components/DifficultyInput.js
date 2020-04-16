import { SwitcherItem } from 'components/SwitcherItem'
import React from 'react'

const difficultyTypes = {
	Easy: 'success',
	Medium: '',
	Hard: 'danger',
}

export const DifficultyInput = ({ difficulty, setState }) => (
	<div className='uk-margin-medium'>
		Difficulty
		<ul
			className='uk-subnav uk-subnav-pill uk-child-width-1-3'
			style={{ marginTop: '0.5em' }}
		>
			{Object.entries(difficultyTypes).map(([d, t]) => (
				<SwitcherItem
					key={d}
					value={d}
					type={t}
					active={d === difficulty}
					onClick={() => setState(d)}
				/>
			))}
		</ul>
	</div>
)
