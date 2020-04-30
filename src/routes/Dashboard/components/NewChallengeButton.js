import { Link } from '@reach/router'
import AnimatedCard from 'components/animated/AnimatedCard'
import React from 'react'
import Overlay from './Overlay'

const NewChallengeButton = () => (
	<Link to='create'>
		<AnimatedCard className='uk-transition-toggle'>
			<div className='uk-flex' style={{ height: '3em' }}>
				<p className='uk-margin-auto-vertical uk-text-primary text-large uk-text-uppercase'>
					New challenge
				</p>
			</div>
			<Overlay text='create' isVisible={false}/>
		</AnimatedCard>
	</Link>
)

export default NewChallengeButton
