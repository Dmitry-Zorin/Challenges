import React, { Component } from 'react'
import axios from 'axios'
import { Form } from 'uikit-react'
import { InnerLayout } from '../../components/InnerLayout'
import {
	addNotification,
	challengesQuery,
	handleError,
} from '../../services/helper'
import { DataContext } from '../../services/contexts/DataContext'
import { notifications } from '../../services/data/notifications'
import { DifficultyInput } from './components/DifficultyInput'
import { TimeInput } from './components/TimeInput'
import { Buttons } from './components/Buttons'
import { TextInput } from '../../components/TextInput'
import { faCalendarPlus, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const info = {
	create: {
		api: 'challengeAdd',
		notification: 'challengeCreated',
		action: 'Create',
		title: 'New Challenge',
		save: 'Create',
	},
	edit: {
		id: '$id: String!',
		id_var: 'id: $id',
		api: 'challengeEdit',
		notification: 'challengeEdited',
		action: 'Update',
		title: 'Edit Challenge',
		save: 'Save',
	},
}

export class Challenge extends Component {
	static contextType = DataContext

	constructor(props) {
		super(props)
		this.getChallenge = this.getChallenge.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.save = this.save.bind(this)

		this.state = {
			...this.getChallenge(),
		}
		this.info = !this.state._id ? {
			...info.create,
			navigate: () => props.navigate('..'),
		} : {
			...info.edit,
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
		const name = this.state.name || defaultName
		const startDate = new Date().getTime() + (this.state.delay || 0)
		const endDate = startDate + (this.state.duration || 0)

		const data = {
			query: `mutation(
		    ${this.info.id || ''}
		    $name: String!
		    $difficulty: Difficulty
		    $startDate: Float
		    $endDate: Float
		  ) {
		    ${this.info.api}(
		      ${this.info.id_var || ''}
		      challenge: {
		        name: $name
		        difficulty: $difficulty
		        startDate: $startDate
		        endDate: $endDate
		      }
		    ) ${challengesQuery}
		  }`,
			variables: {
				id: this.state._id,
				name,
				difficulty: this.state.difficulty,
				startDate,
				endDate,
			},
		}

		this.context.showSpinner()
		axios.post(this.context.apiServer, data, { withCredentials: true })
			.then(({ data: { data } }) => {
				this.context.update(data[this.info.api].challenges)
				addNotification({
					...notifications[this.info.notification],
					message: name,
				})
				this.info.navigate()
			})
			.catch(err => {
				handleError(err, `Failed to ${this.info.action} challenge`)
			})
			.finally(this.context.hideSpinner)
	}

	render = () => {
		const defaultName = 'Challenge from ' + new Date().toString()
			.split(' ').slice(1, 5).join(' ').slice(0, -3)

		return (
			<InnerLayout>
				<p className='uk-h2 uk-text-center'>
					{!this.state._id ? (
						<FontAwesomeIcon
							icon={faCalendarPlus}
							className='icon-left'
							transform='shrink-4'
						/>
					) : (
						<FontAwesomeIcon
							icon={faPen}
							className='icon-left'
							transform='shrink-4'
						/>
					)}
					{this.info.title}
				</p>
				<Form>
					<TextInput
						label='Name'
						value={this.state.name}
						defaultValue={defaultName}
						handleChange={this.handleChange}
					/>
					<DifficultyInput
						difficulty={this.state.difficulty || 'Easy'}
						handleChange={this.handleChange}
					/>
					<TimeInput
						name='Duration'
						ms={this.state.duration || 0}
						handleChange={this.handleChange}
					/>
					<TimeInput
						name='Delay'
						ms={this.state.delay || 0}
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
