import React from 'react'
import { Card, Flex } from 'uikit-react'
import { Link } from '@reach/router'
import { Overlay } from './Overlay'

export const NewChallengeButton = () => (
	<Link to='/create'>
		<Card
			className='uk-transition-toggle'
			style={{ height: '6em', paddingTop: '2em', paddingBottom: 0 }}
		>
			<Flex className='font-size-large uk-text-uppercase'>
				<p>New challenge</p>
			</Flex>
			<Overlay text='create'/>
		</Card>
	</Link>
)
