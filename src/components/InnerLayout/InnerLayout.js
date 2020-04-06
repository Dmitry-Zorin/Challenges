import React from 'react'
import { Card } from 'uikit-react'
import styles from './InnerLayout.module.scss'

export const InnerLayout = ({ title, children }) => (
	<Card className={styles.innerLayout}>
		<div className='uk-align-center' style={{ maxWidth: '800px' }}>
			{title && (
				<p className='uk-h2 uk-text-center'>
					{title[0].toUpperCase() + title.slice(1)}
				</p>
			)}
			{children}
		</div>
	</Card>
)
