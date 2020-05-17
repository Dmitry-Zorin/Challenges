import React from 'react'
import Overlay from './Overlay'

const NewChallengeButton = () => (
	<Overlay to='create' text='create'>
		<p className='uk-text-primary uk-text-center uk-text-uppercase text-large padding'>
			New challenge
		</p>
	</Overlay>
)

export default NewChallengeButton
