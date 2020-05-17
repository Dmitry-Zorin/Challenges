import { Subnav } from 'components'
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
		<div className='padding-text-top'>
			<p className='uk-text-primary'>Difficulty</p>
			<Subnav padding={false} {...{ items }}/>
		</div>
	)
}

export default DifficultyInput
