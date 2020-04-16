import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'uikit-react'

export const SubmitButton = () => (
	<Button
		className='uk-align-center uk-width-1-3@m uk-width-1-2@s'
		style={{ marginTop: '4em' }}
	>
		<FontAwesomeIcon
			icon='paper-plane'
			className='icon-left-2'
			transform='shrink-3'
		/>
		Submit
	</Button>
)
