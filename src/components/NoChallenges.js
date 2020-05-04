import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NoChallenges = ({ extended, className, ...props }) => (
	<p
		className={[
			'uk-text-center',
			'uk-text-muted',
			extended ? 'text-medium uk-padding' : '',
			className,
		].join(' ')}
		{...props}
	>
		<FontAwesomeIcon icon='ban'/>
		No challenges...
	</p>
)

export default NoChallenges
