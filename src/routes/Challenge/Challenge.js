import React, { useContext, useState } from 'react'
import { Form } from 'uikit-react'
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
	if (c) {
		const now = new Date().getTime()
		c.duration = Math.max(0, c.endDate - Math.max(c.startDate, now))
		c.delay = Math.max(0, c.startDate - now)
	}
	
	const [name, setName] = useState(c?.name)
	const [difficulty, setDifficulty] = useState(c?.difficulty || 'Easy')
	const [duration, setDuration] = useState(c?.duration || 0)
	const [delay, setDelay] = useState(c?.delay || 0)
	
	const info = c?._id ? {
		...actionOptions.edit,
		navigate: () => window.history.back(),
	} : {
		...actionOptions.create,
		navigate: () => navigate('..'),
	}
	
	const save = (defaultName) => {
		info.navigate()
		
		const variables = {
			id: c?._id,
			name: name || defaultName,
			difficulty,
			startDate: new Date().getTime() + delay,
		}
		variables.endDate = variables.startDate + duration
		
		saveChallenge(context, info.action, variables)
			.then(context.update)
			.catch(() => {})
	}
	
	const defaultName = 'Challenge from ' + new Date().toString()
		.split(' ').slice(1, 5).join(' ').slice(0, -3)
	
	return (
		<InnerLayout title={info.title}>
			<Form>
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
					save={() => save(defaultName)}
					saveValue={info.save}
					withCancel={!!c?._id}
				/>
			</Form>
		</InnerLayout>
	)
}
