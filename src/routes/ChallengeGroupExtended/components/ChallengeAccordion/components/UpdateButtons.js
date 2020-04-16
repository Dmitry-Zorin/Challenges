import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataContext } from 'contexts/DataContext'
import { capitalize } from 'lodash'
import React, { useContext } from 'react'
import { updateChallenge } from 'scripts/requests'

const info = {
	start: { icon: 'play', buttonType: 'info' },
	complete: { icon: 'check', buttonType: 'success' },
	edit: { icon: 'pen', buttonType: 'secondary' },
	delete: { icon: 'trash-alt', buttonType: 'danger' },
}

export const UpdateButtons = ({ challenge, navigate, options }) => {
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
		<div className='uk-width-expand uk-text-right uk-animation'>
			{[...options || [], 'edit', 'delete'].map(o => {
					const action = info[o.toLowerCase()]
					return (
						<button
							key={o}
							className={`uk-button uk-button-${action.buttonType} uk-padding-remove`}
							style={{ width: '3em', marginLeft: '0.5em' }}
							data-uk-tooltip={`title: ${capitalize(o)}; delay: 100`}
							onClick={() => update(o)}
						>
							<FontAwesomeIcon
								icon={action.icon}
								className='icon-center uk-margin-auto'
								transform='grow-2'
							/>
						</button>
					)
				},
			)}
		</div>
	)
}
