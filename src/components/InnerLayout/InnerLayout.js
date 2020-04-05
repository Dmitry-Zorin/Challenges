import React from 'react'
import { Card } from 'uikit-react'
import styles from './InnerLayout.module.scss'

export const InnerLayout = ({ title, children }) => (
	<Card className={styles.innerLayout}>
		<div className='uk-align-center' style={{ maxWidth: '800px' }}>
			{title && (
				<p className='font-size-xlarge uk-text-center'>
					{title.toUpperCase()}
				</p>
			)}
			{children}
		</div>
	</Card>
)
