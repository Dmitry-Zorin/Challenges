import { Link } from '@reach/router'
import AnimatedCard from 'components/animated/AnimatedCard'
import React from 'react'
import { Flex } from 'uikit-react'
import Overlay from './Overlay'

const NewChallengeButton = () => (
	<Link to='create'>
		<AnimatedCard className='uk-transition-toggle'>
			<Flex style={{ height: '3em' }}>
				<p className='uk-margin-auto-vertical uk-text-primary text-large uk-text-uppercase'>
					New challenge
				</p>
			</Flex>
			<Overlay text='create'/>
		</AnimatedCard>
	</Link>
)

export default NewChallengeButton
