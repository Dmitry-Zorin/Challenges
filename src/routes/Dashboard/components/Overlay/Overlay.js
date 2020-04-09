import React from 'react'
import styles from './Overlay.module.scss'
import { capitalize } from 'lodash'

export const Overlay = ({ text }) => (
	<div className={`
		${styles.overlay}
		uk-position-right
		uk-overlay
		uk-transition-slide-right
		uk-hidden-touch
	`}>
		<p className='font-size-medium uk-position-center'>{capitalize(text)}</p>
	</div>
)
