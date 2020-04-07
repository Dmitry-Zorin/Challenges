import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCheck,
	faPen,
	faPlay,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { addNotification } from 'scripts/utils'
import challengeNotif from 'data/notifications/challenge'
import { DataContext } from 'contexts/DataContext'
import { updateChallenge } from 'scripts/services'

const icons = {
	start: faPlay,
	complete: faCheck,
	edit: faPen,
	delete: faTrashAlt,
}

export const Buttons = ({ challenge, navigate, options }) => {
	const context = useContext(DataContext)
	
	const update = (action) => {
		if (action === 'Edit') return navigate('/edit', { state: { challenge } })
		
		updateChallenge(context, action, { id: challenge._id })
			.then(res => {
				context.update(res.challenges)
				addNotification({
					...challengeNotif[`${action.toLowerCase()}ed`.replace('ee', 'e')],
					message: challenge.name,
				})
			})
	}
	
	return (
		<div className='uk-width-expand uk-text-right'>
			{[...options || [], 'Edit', 'Delete'].map(o => (
				<button
					key={o}
					className='uk-button uk-padding-remove'
					style={{ width: '3em', marginLeft: '0.5em' }}
					data-uk-tooltip={o}
					onClick={() => update(o)}
				>
					<FontAwesomeIcon icon={icons[o.toLowerCase()]} transform='grow-3'/>
				</button>
			))}
		</div>
	)
}
