import AnimatedDiv from 'components/animated/AnimatedDiv'
import AnimatedSwitcherItem from 'components/animated/AnimatedSwitcherItem'
import React from 'react'

const difficultyTypes = {
	Easy: 'success',
	Medium: '',
	Hard: 'danger',
}

const DifficultyInput = ({ difficulty, setState }) => (
	<AnimatedDiv className='uk-margin-medium'>
		<p className='uk-text-primary'>
			Difficulty
		</p>
		<ul
			className='uk-subnav uk-subnav-pill uk-child-width-1-3'
			style={{ marginTop: '0.5em' }}
		>
			{Object.entries(difficultyTypes).map(([d, t]) => (
				<AnimatedSwitcherItem
					key={d}
					value={d}
					type={t}
					active={d === difficulty}
					onClick={() => setState(d)}
				/>
			))}
		</ul>
	</AnimatedDiv>
)

export default DifficultyInput
