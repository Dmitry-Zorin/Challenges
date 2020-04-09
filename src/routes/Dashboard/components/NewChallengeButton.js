import React from 'react'
import { Card } from 'uikit-react'
import { Link } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Overlay } from './Overlay'

export const NewChallengeButton = () => (
	<Link to='/create' className='uk-margin-remove uk-padding-remove'>
		<Card
			className='uk-transition-toggle'
			style={{ height: '6em', paddingTop: '2em', paddingBottom: 0 }}
		>
			<p className='font-size-large uk-text-center'>
				<FontAwesomeIcon
					icon={faBolt}
					className='icon-left'
					transform='shrink-4'
				/>
				NEW CHALLENGE
			</p>
			<Overlay text='create' icon={faPlus}/>
		</Card>
	</Link>
)
