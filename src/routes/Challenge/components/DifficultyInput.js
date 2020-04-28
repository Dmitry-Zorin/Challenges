import AnimatedDiv from 'components/animated/AnimatedDiv'
import Subnav from 'components/Subnav'
import React from 'react'

const difficultyTypes = {
	Easy: 'success',
	Medium: '',
	Hard: 'danger',
}

const DifficultyInput = ({ difficulty, setState }) => {
	const items = Object.entries(difficultyTypes).map(([d, t]) => ({
		key: d,
		value: d,
		type: t,
		active: d === difficulty,
		onClick: () => setState(d),
	}))
	
	return (
		<AnimatedDiv className='uk-margin-medium'>
			<p className='uk-text-primary'>Difficulty</p>
			<Subnav {...{ items }} style={{ marginTop: '0.5em' }}/>
		</AnimatedDiv>
	)
}

export default DifficultyInput
