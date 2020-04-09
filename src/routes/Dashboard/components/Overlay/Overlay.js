import React from 'react'
import styles from './Overlay.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { capitalize } from 'lodash'

export const Overlay = ({ text, icon }) => (
	<div className={`
		${styles.overlay}
		uk-position-right
		uk-overlay
		uk-transition-slide-right
		uk-hidden-touch
	`}>
		<p className='font-size-medium uk-position-center'>
			<FontAwesomeIcon
				icon={icon}
				className='icon-left'
				transform='shrink-3 down-0.2'
			/>
			{capitalize(text)}
		</p>
	</div>
)
