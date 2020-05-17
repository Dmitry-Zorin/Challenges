import { InnerLayout, TextInput } from 'components'
import RequestContext from 'contexts/RequestContext'
import UserContext from 'contexts/UserContext'
import React, { useContext, useState } from 'react'
import { ActionButtons, DifficultyInput, TimeInput } from './components'

const Challenge = ({ navigate, location }) => {
	const context = useContext(UserContext)
	const { saveChallenge } = useContext(RequestContext)
	
	const c = location.state?.challenge
	const startDate = c?.startDate || 0
	const endDate = c?.endDate || 0
	const now = new Date().getTime()
	
	const [name, setName] = useState(c?.name)
	const [difficulty, setDifficulty] = useState(
		c?.difficulty || 'Easy',
	)
	const [duration, setDuration] = useState(
		Math.max(0, endDate - Math.max(startDate, now)),
	)
	const [delay, setDelay] = useState(
		Math.max(0, startDate - now),
	)
	
	const info = c?._id ? {
		action: 'edit',
		title: 'edit challenge',
		save: 'save',
		navigate: () => window.history.back(),
	} : {
		action: 'create',
		title: 'new challenge',
		save: 'create challenge',
		navigate: () => navigate('..'),
	}
	
	const save = (e, defaultName) => {
		e.preventDefault()
		info.navigate()
		
		const variables = {
			id: c?._id,
			name: name || defaultName,
			difficulty,
			duration,
			delay,
		}
		saveChallenge(info.action, variables)
			.then(context.updateChallenges)
			.catch(() => {})
	}
	
	// Default name
	const prefix = 'Challenge #'
	const pattern = new RegExp(`${prefix}(\\d+)`)
	const defaultName = prefix + (1 + Math.max(
		0, ...Object.values(context.challenges).flat()
			.map(c => c.name.match(pattern)?.[1] || 0),
	))
	
	return (
		<InnerLayout title={info.title}>
			<form
				className='uk-form'
				onSubmit={e => save(e, defaultName)}
			>
				<TextInput
					label='name'
					value={name}
					defaultValue={defaultName}
					setState={setName}
					capital
				/>
				<DifficultyInput setState={setDifficulty} {...{ difficulty }}/>
				<TimeInput name='duration' ms={duration} setState={setDuration}/>
				<TimeInput name='delay' ms={delay} setState={setDelay}/>
				<ActionButtons saveValue={info.save} withCancel={!!c?._id}/>
			</form>
		</InnerLayout>
	)
}

export default Challenge
