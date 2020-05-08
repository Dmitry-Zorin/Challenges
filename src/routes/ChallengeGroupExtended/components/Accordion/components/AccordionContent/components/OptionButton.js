import AnimatedButton from 'components/animated/AnimatedButton'
import DataContext from 'contexts/DataContext'
import { upperFirst } from 'lodash'
import React, { useContext } from 'react'
import { updateChallenge } from 'scripts/requests'

const info = {
	start: { icon: 'play', buttonType: 'info' },
	complete: { icon: 'check', buttonType: 'success' },
	edit: { icon: 'pen', buttonType: 'secondary' },
	delete: { icon: 'trash-alt', buttonType: 'danger' },
}

const OptionButton = ({ challenge, navigate, option }) => {
	const context = useContext(DataContext)
	
	const onClick = () => {
		if (option === 'edit') {
			return navigate('/edit', { state: { challenge } })
		}
		const { challenges, updateChallenges } = context
		const { _id: id, name } = challenge
		
		for (const [name, group] of Object.entries(challenges))
			challenges[name] = group.filter(c => c._id !== id)
		
		updateChallenges(challenges)
		
		updateChallenge(context, option, { id }, name)
			.then(updateChallenges).catch(() => {})
	}
	
	return (
		<AnimatedButton
			key={option}
			className={`uk-button-${info[option].buttonType} uk-margin-small-left`}
			icon={info[option].icon}
			data-uk-tooltip={`title: ${upperFirst(option)}; delay: 100`}
			style={{ width: 45, height: 45, borderRadius: '100%' }}
			{...{ onClick }}
		/>
	)
}

export default OptionButton
