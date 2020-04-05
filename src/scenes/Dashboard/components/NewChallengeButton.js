import React from 'react'
import dashboardStyles from '../Dashboard.module.scss'
import { Card } from 'uikit-react'
import { Link } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faPlus } from '@fortawesome/free-solid-svg-icons'

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
			<div className={`
				${dashboardStyles.overlay}
				uk-position-right
				uk-overlay
				uk-transition-slide-right
				uk-hidden-touch
			`}>
				<p className='font-size-medium uk-position-center'>
					<FontAwesomeIcon
						icon={faPlus}
						className='icon-left'
						transform='shrink-3 down-0.2'
					/>
					Create
				</p>
			</div>
		</Card>
	</Link>
)
