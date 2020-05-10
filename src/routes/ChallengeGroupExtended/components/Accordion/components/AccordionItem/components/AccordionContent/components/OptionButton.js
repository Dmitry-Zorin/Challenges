import { Animation, Button } from 'components'
import DataContext from 'contexts/DataContext'
import { AnimatePresence } from 'framer-motion'
import { upperFirst } from 'lodash'
import React, { useContext } from 'react'
import { updateChallenge } from 'scripts/requests'

const info = {
	start: { icon: 'play', buttonType: 'info' },
	complete: { icon: 'check', buttonType: 'success' },
	edit: { icon: 'pen', buttonType: 'secondary' },
	delete: { icon: 'trash-alt', buttonType: 'danger' },
}
const size = 40

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
		<AnimatePresence>
			<Animation type='zoom' className='uk-margin-small-left'>
				<Button
					className={`uk-button-${info[option].buttonType} uk-border-circle`}
					icon={info[option].icon}
					style={{ width: size, height: size }}
					data-uk-tooltip={`title: ${upperFirst(option)}; delay: 100`}
					{...{ onClick }}
				/>
			</Animation>
		</AnimatePresence>
	)
}

export default OptionButton
