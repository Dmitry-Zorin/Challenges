import React from 'react'
import { Card } from 'uikit-react'
import { Link } from '@reach/router'
import { Overlay } from './Overlay'

export const NewChallengeButton = () => (
	<Link to='/create' className='uk-margin-remove uk-padding-remove'>
		<Card
			className='uk-transition-toggle'
			style={{ height: '6em', paddingTop: '2em', paddingBottom: 0 }}
		>
			<p className='font-size-large uk-text-center uk-text-uppercase'>
				New challenge
			</p>
			<Overlay text='create'/>
		</Card>
	</Link>
)
