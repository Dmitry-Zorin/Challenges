import React from 'react'
import styles from './LeftColumn.module.scss'
import { Card } from 'uikit-react'

export const LeftColumn = () => (
	<div className={styles.leftColumn + ' uk-width-1-3 uk-padding-remove-left'}>
		<div className={styles.container}>
			<Card className='uk-height-1-1'>
				<p className='font-size-large uk-text-center uk-margin-remove-bottom'>
					Info
				</p>
			</Card>
		</div>
	</div>
)
