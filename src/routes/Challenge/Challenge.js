import React, { Component } from 'react'
import { Form } from 'uikit-react'
import { InnerLayout } from 'components/InnerLayout'
import { DataContext } from 'contexts/DataContext'
import { DifficultyInput } from './components/DifficultyInput'
import { TimeInput } from './components/TimeInput'
import { Buttons } from './components/Buttons'
import { TextInput } from 'components/TextInput'
import { saveChallenge } from 'scripts/requests'

export class Challenge extends Component {
	static contextType = DataContext
	
	constructor(props) {
		super(props)
		this.getChallenge = this.getChallenge.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.save = this.save.bind(this)
		
		this.state = {
			difficulty: 'Easy',
			duration: 0,
			delay: 0,
			...this.getChallenge(),
		}
		
		this.info = !this.state._id ? {
			action: 'create',
			title: 'new challenge',
			save: 'create challenge',
			navigate: () => props.navigate('..'),
		} : {
			action: 'edit',
			title: 'edit challenge',
			save: 'save',
			navigate: () => window.history.back(),
		}
	}
	
	getChallenge() {
		const c = (this.props.location.state || {}).challenge
		if (!c) return
		
		const now = new Date().getTime()
		c.duration = Math.max(0, c.endDate - Math.max(c.startDate, now))
		c.delay = Math.max(0, c.startDate - now)
		return c
	}
	
	handleChange(name, value) {
		this.setState({ [name]: value })
	}
	
	save(defaultName) {
		const variables = {
			id: this.state._id,
			name: this.state.name || defaultName,
			difficulty: this.state.difficulty,
			startDate: new Date().getTime() + this.state.delay,
		}
		variables.endDate = variables.startDate + this.state.duration
		
		saveChallenge(this.context, this.info.action, variables)
			.then(challenges => {
				this.context.update(challenges)
				this.info.navigate()
			})
			.catch(() => {})
	}
	
	render = () => {
		const defaultName = 'Challenge from ' + new Date().toString()
			.split(' ').slice(1, 5).join(' ').slice(0, -3)
		
		return (
			<InnerLayout title={this.info.title}>
				<Form>
					<TextInput
						label='name'
						value={this.state.name}
						defaultValue={defaultName}
						handleChange={this.handleChange}
					/>
					<DifficultyInput
						difficulty={this.state.difficulty}
						handleChange={this.handleChange}
					/>
					<TimeInput
						name='duration'
						ms={this.state.duration}
						handleChange={this.handleChange}
					/>
					<TimeInput
						name='delay'
						ms={this.state.delay}
						handleChange={this.handleChange}
					/>
					<Buttons
						save={() => this.save(defaultName)}
						saveValue={this.info.save}
						withCancel={!!this.state._id}
					/>
				</Form>
			</InnerLayout>
		)
	}
}
