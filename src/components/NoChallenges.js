import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Flex } from 'uikit-react'

export const NoChallenges = ({ extended }) => (
	<Flex className='uk-margin-medium-top uk-padding-small'>
		<p className={`${extended ? 'font-size-medium' : ''} uk-text-muted`}>
			<FontAwesomeIcon icon='ban' transform='shrink-4 down-0.5'/>
			No challenges...
		</p>
	</Flex>
)
