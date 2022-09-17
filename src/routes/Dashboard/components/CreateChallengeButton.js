import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HStack from 'components/HStack'
import CardLink from './CardLink'

const NewChallengeButton = () => (
	<CardLink to="/create" text="create">
		<HStack className="uk-text-primary uk-text-center uk-text-bold uk-text-uppercase text-large uk-padding-small uk-flex-center">
			<FontAwesomeIcon icon={faCirclePlus} />
			Create challenge
		</HStack>
	</CardLink>
)

export default NewChallengeButton
