import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCheck,
	faPen,
	faPlay,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {
	addNotification,
	challengesQuery,
	handleError,
} from '../../../services/helper'
import { notifications } from '../../../services/data/notifications'
import { DataContext } from '../../../services/contexts/DataContext'

export const Buttons = ({ challenge, navigate, options }) => {
	const context = useContext(DataContext)

	const update = action => {
		const data = {
			query: `mutation($id: String!) {
        challenge${action}(id: $id) 
          ${challengesQuery}
      }`,
			variables: { id: challenge._id },
		}

		context.showSpinner()
		axios.post(context.apiServer, data, { withCredentials: true })
			.then(({ data: { data } }) => {
				context.update(data[`challenge${action}`].challenges)
				addNotification({
					...action === 'Start' ? notifications.challengeStarted
						: action === 'Complete' ? notifications.challengeCompleted
							: notifications.challengeDeleted,
					message: challenge.name,
				})
			})
			.catch(err => {
				handleError(err, `Failed to ${action.toLowerCase()} challenge`)
			})
			.finally(context.hideSpinner)
	}

	return (
		<div className='uk-width-expand uk-text-right'>
			{options.includes('start') && (
				<Button
					icon={faPlay}
					tooltip='Start'
					onClick={() => update('Start')}
				/>
			)}

			{options.includes('complete') && (
				<Button
					icon={faCheck}
					tooltip='Complete'
					onClick={() => update('Complete')}
				/>
			)}

			<Button
				icon={faPen}
				tooltip='Edit'
				onClick={() => navigate('/edit', { state: { challenge } })}
			/>

			{options.includes('delete') && (
				<Button
					icon={faTrashAlt}
					tooltip='Delete'
					onClick={() => update('Delete')}
				/>
			)}
		</div>
	)
}

const Button = ({ icon, tooltip, onClick }) => (
	<button
		className='uk-button uk-padding-remove'
		style={{ width: '3em', marginLeft: '0.5em' }}
		data-uk-tooltip={tooltip}
		onClick={onClick}
	>
		<FontAwesomeIcon icon={icon} transform='grow-3'/>
	</button>
)
