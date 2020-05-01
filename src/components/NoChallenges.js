import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NoChallenges = ({ extended, className, ...props }) => (
	<p
		className={[
			'uk-text-center',
			'uk-text-muted',
			'uk-margin-top',
			extended ? 'text-medium uk-padding' : 'uk-margin-small-bottom',
			className,
		].join(' ')}
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
