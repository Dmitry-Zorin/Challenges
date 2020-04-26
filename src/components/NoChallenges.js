import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NoChallenges = ({ extended }) => (
	<p
		className={`
			uk-margin-${extended ? 'medium-top text-medium' : 'small'}
			uk-text-center
			uk-text-muted
		`}
	>
		<FontAwesomeIcon icon='ban' transform='shrink-5 down-1'/>
		No challenges...
	</p>
)

export default NoChallenges
