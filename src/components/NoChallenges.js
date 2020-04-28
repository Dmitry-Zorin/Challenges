import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NoChallenges = ({ extended, className, ...props }) => (
	<p
		className={`
			uk-margin-${extended ? 'medium-top text-medium' : 'small'}
			uk-text-center
			uk-text-muted
			${className}
		`}
		{...props}
	>
		<FontAwesomeIcon
			icon='ban'
			transform={`shrink-5 down-${extended ? 0.5 : 1}`}
		/>
		No challenges...
	</p>
)

export default NoChallenges
