import { Link } from '@reach/router'
import React from 'react'
import { Card, Flex } from 'uikit-react'
import { Overlay } from './Overlay'

export const NewChallengeButton = () => (
	<Link to='/create'>
		<Card className='uk-transition-toggle' style={{ height: '6em' }}>
			<Flex className='font-size-large uk-text-uppercase uk-height-1-1'>
				<p>New challenge</p>
			</Flex>
			<Overlay text='create'/>
		</Card>
	</Link>
)
