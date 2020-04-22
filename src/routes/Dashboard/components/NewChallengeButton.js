import { Link } from '@reach/router'
import AnimatedCard from 'components/Animated/AnimatedCard/AnimatedCard'
import React from 'react'
import { Flex } from 'uikit-react'
import Overlay from './Overlay'

const NewChallengeButton = () => (
	<Link to='/create'>
		<AnimatedCard className='uk-transition-toggle'>
			<Flex
				className='font-size-large uk-text-uppercase'
				style={{ height: '2em' }}
			>
				<p className='text-secondary'>New challenge</p>
			</Flex>
			<Overlay text='create'/>
		</AnimatedCard>
	</Link>
)

export default NewChallengeButton
