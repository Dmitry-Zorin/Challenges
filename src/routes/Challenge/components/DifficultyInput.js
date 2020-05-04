import AnimatedDiv from 'components/animated/AnimatedDiv'
import Subnav from 'components/Subnav'
import React from 'react'

const difficultyTypes = {
	Easy: 'success',
	Medium: 'primary',
	Hard: 'danger',
}

const DifficultyInput = ({ difficulty, setState }) => {
	const items = Object.entries(difficultyTypes).map(([d, t]) => ({
		value: d,
		type: t,
		active: d === difficulty,
		onClick: () => setState(d),
	}))
	
	return (
		<AnimatedDiv className='uk-margin-medium'>
			<p className='uk-text-primary'>Difficulty</p>
			<Subnav {...{ items }}/>
		</AnimatedDiv>
	)
}

export default DifficultyInput
