import Animation from 'components/Animation'
import React from 'react'
import Overlay from './Overlay'

const NewChallengeButton = () => (
	<Overlay to='create' text='create'>
		<Animation type='fade'>
			<p className='uk-text-primary uk-text-center uk-text-uppercase text-large padding'>
				New challenge
			</p>
		</Animation>
	</Overlay>
)

export default NewChallengeButton
