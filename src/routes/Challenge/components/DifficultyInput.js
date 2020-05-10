import { Animation, Subnav } from 'components'
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
		<Animation type='fade' className='padding-text-top'>
			<p className='uk-text-primary'>Difficulty</p>
			<Subnav padding={false} {...{ items }}/>
		</Animation>
	)
}

export default DifficultyInput
