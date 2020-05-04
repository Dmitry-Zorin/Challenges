import React from 'react'
import Overlay from './Overlay'

const NewChallengeButton = () => (
	<Overlay to='create' text='create'>
		<div className='uk-flex' style={{ height: '3.5em' }}>
			<p className='uk-text-primary text-large uk-text-uppercase'>
				New challenge
			</p>
		</div>
	</Overlay>
)

export default NewChallengeButton
