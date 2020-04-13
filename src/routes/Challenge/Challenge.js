import React, { useContext, useState } from 'react'
import { InnerLayout } from 'components/InnerLayout'
import { DataContext } from 'contexts/DataContext'
import { DifficultyInput } from './components/DifficultyInput'
import { TimeInput } from 'routes/Challenge/components/TimeInput/TimeInput'
import { Buttons } from './components/Buttons'
import { TextInput } from 'components/TextInput'
import { saveChallenge } from 'scripts/requests'

const actionOptions = {
	create: {
		action: 'create',
		title: 'new challenge',
		save: 'create challenge',
	},
	edit: {
		action: 'edit',
		title: 'edit challenge',
		save: 'save',
	},
}

export const Challenge = ({ navigate, location }) => {
	const context = useContext(DataContext)
	
	const c = location.state?.challenge
	const now = new Date().getTime()
	const [name, setName] = useState(c?.name)
	const [difficulty, setDifficulty] = useState(c?.difficulty || 'Easy')
	const [duration, setDuration] = useState(
		c?.duration || Math.max(0, (c?.endDate || 0) - now),
	)
	const [delay, setDelay] = useState(Math.max(0, (c?.startDate || 0) - now))
	
	const info = c?._id ? {
		...actionOptions.edit,
		navigate: () => window.history.back(),
	} : {
		...actionOptions.create,
		navigate: () => navigate('..'),
	}
	
	const save = (e, defaultName) => {
		e.preventDefault()
		info.navigate()
		
		const variables = {
			id: c?._id,
			name: name || defaultName,
			difficulty, duration, delay,
		}
		saveChallenge(context, info.action, variables)
			.then(context.updateChallenges)
			.catch(() => {})
	}
	
	const defaultName = 'Challenge from ' + new Date().toString()
		.split(' ').slice(1, 5).join(' ').slice(0, -3)
	
	return (
		<InnerLayout title={info.title}>
			<form className='uk-form' onSubmit={e => save(e, defaultName)}>
				<TextInput
					label='name'
					value={name}
					defaultValue={defaultName}
					setState={setName}
					capital={true}
				/>
				<DifficultyInput
					difficulty={difficulty}
					setState={setDifficulty}
				/>
				<TimeInput
					name='duration'
					ms={duration}
					setState={setDuration}
				/>
				<TimeInput
					name='delay'
					ms={delay}
					setState={setDelay}
				/>
				<Buttons
					saveValue={info.save}
					withCancel={!!c?._id}
				/>
			</form>
		</InnerLayout>
	)
}
