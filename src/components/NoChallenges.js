import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NoChallenges = ({ extended, className, ...props }) => (
	<div className={extended ? 'padding-text' : ''}>
		<p className={`uk-text-center uk-text-muted ${className}`} {...props}>
			<FontAwesomeIcon icon='ban'/>
			No challenges...
		</p>
	</div>
)

export default NoChallenges
