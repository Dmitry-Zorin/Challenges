import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Flex } from 'uikit-react'

const NoChallenges = ({ extended }) => (
	<Flex className={extended ? 'uk-margin-medium-top' : 'uk-margin-small'}>
		<p className={`${extended ? 'text-medium' : ''} uk-text-muted`}>
			<FontAwesomeIcon icon='ban' transform='shrink-5 down-1.25'/>
			No challenges...
		</p>
	</Flex>
)

export default NoChallenges
