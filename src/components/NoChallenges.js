import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NoChallenges = ({ extended }) => (
	<div className={extended ? 'padding-text' : ''}>
		<p className="uk-text-center uk-text-muted">
			<FontAwesomeIcon icon="ban" />
			No challenges...
		</p>
	</div>
)

export default NoChallenges
