import { Animation, Button } from 'components'
import { RequestContext, UserContext } from 'contexts'
import { upperFirst } from 'lodash'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const info = {
	start: { icon: 'play', buttonType: 'info' },
	complete: { icon: 'check', buttonType: 'success' },
	edit: { icon: 'pen', buttonType: 'secondary' },
	delete: { icon: 'trash-alt', buttonType: 'danger' },
}
const size = 40

const OptionButton = ({ challenge, option }) => {
	const { challenges, updateChallenges } = useContext(UserContext)
	const { updateChallenge } = useContext(RequestContext)
	const navigate = useNavigate()

	const onClick = () => {
		if (option === 'edit') {
			return navigate('/edit', { state: { challenge } })
		}

		const { _id: id, name } = challenge

		for (const [name, group] of Object.entries(challenges))
			challenges[name] = group.filter((c) => c._id !== id)

		updateChallenges(challenges)

		updateChallenge(option, { id }, name)
			.then(updateChallenges)
			.catch(() => {})
	}

	return (
		<Animation item type="zoom" className="uk-margin-small-left">
			<Button
				className={`uk-button-${info[option].buttonType} uk-border-circle`}
				style={{ width: size, height: size }}
				icon={info[option].icon}
				data-uk-tooltip={`title: ${upperFirst(option)}; duration: 200`}
				onClick={onClick}
			/>
		</Animation>
	)
}

export default OptionButton
