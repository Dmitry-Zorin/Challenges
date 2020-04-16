import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataContext } from 'contexts/DataContext'
import { capitalize } from 'lodash'
import React, { useContext } from 'react'
import { updateChallenge } from 'scripts/requests'

const icons = {
	start: 'play',
	complete: 'check',
	edit: 'pen',
	delete: 'trash-alt',
}

export const Buttons = ({ challenge, navigate, options }) => {
	const context = useContext(DataContext)
	
	const update = (action) => {
		if (action === 'edit') {
			return navigate('/edit', { state: { challenge } })
		}
		const { challenges, updateChallenges } = context
		const { _id: id, name } = challenge
		
		for (const [name, group] of Object.entries(challenges))
			challenges[name] = group.filter(c => c._id !== id)
		
		updateChallenges(challenges)
		
		updateChallenge(context, action, { id }, name)
			.then(updateChallenges).catch(() => {})
	}
	
	return (
		<div className='uk-width-expand uk-text-right'>
			{[...options || [], 'edit', 'delete'].map(o => (
				<button
					key={o}
					className='uk-button uk-button-default uk-padding-remove'
					style={{ width: '3em', marginLeft: '0.5em' }}
					data-uk-tooltip={`title: ${capitalize(o)}; delay: 100`}
					onClick={() => update(o)}
				>
					<FontAwesomeIcon
						icon={icons[o.toLowerCase()]}
						className='icon-center'
						transform='grow-2'
					/>
				</button>
			))}
		</div>
	)
}
