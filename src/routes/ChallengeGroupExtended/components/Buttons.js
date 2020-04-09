import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCheck,
	faPen,
	faPlay,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { DataContext } from 'contexts/DataContext'
import { updateChallenge } from 'scripts/requests'
import { capitalize } from 'lodash'

const icons = {
	start: faPlay,
	complete: faCheck,
	edit: faPen,
	delete: faTrashAlt,
}

export const Buttons = ({ challenge, navigate, options }) => {
	const context = useContext(DataContext)
	
	const update = (action) => {
		if (action === 'edit') return navigate('/edit', { state: { challenge } })
		
		updateChallenge(context, action, { id: challenge._id }, challenge.name)
			.then(context.update).catch(() => {})
	}
	
	return (
		<div className='uk-width-expand uk-text-right'>
			{[...options || [], 'edit', 'delete'].map(o => (
				<button
					key={o}
					className='uk-button uk-padding-remove'
					style={{ width: '3em', marginLeft: '0.5em' }}
					data-uk-tooltip={capitalize(o)}
					onClick={() => update(o)}
				>
					<FontAwesomeIcon icon={icons[o.toLowerCase()]} transform='grow-3'/>
				</button>
			))}
		</div>
	)
}
