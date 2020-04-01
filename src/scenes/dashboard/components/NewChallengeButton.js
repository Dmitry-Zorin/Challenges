import React from 'react'
import styles from './NewChallengeButton.module.scss'
import dashboardStyles from '../Dashboard.module.scss'
import { Card } from 'uikit-react'
import { Link } from '@reach/router'

export const NewChallengeButton = () => (
	<Link to='/create' className='uk-margin-remove uk-padding-remove'>
		<Card
			className={styles.createChallenge + ' uk-transition-toggle'}
			tabindex='0'
		>
			<p className='font-size-large uk-text-center'>
				NEW CHALLENGE
			</p>
			<div className={
				`${dashboardStyles.overlay}
				uk-position-right
				uk-overlay
				uk-transition-slide-right
				uk-hidden-touch`
			}>
				<p className='font-size-medium uk-position-center'>
					Create
				</p>
			</div>
		</Card>
	</Link>
)
