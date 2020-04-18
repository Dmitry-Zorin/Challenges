import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Flex } from 'uikit-react'

const NoChallenges = ({ extended }) => (
	<Flex className='uk-margin-medium-top uk-padding-small'>
		<p className={`${extended ? 'font-size-medium' : ''} uk-text-muted`}>
			<FontAwesomeIcon icon='ban' transform='shrink-4 down-0.5'/>
			No challenges...
		</p>
	</Flex>
)

export default NoChallenges
