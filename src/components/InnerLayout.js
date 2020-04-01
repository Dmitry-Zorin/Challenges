import React from 'react'
import { Card } from 'uikit-react'
import styles from './InnerLayout.module.scss'

export const InnerLayout = ({ children }) => (
	<Card className={styles.innerLayout}>
		<div className='uk-align-center' style={{ maxWidth: '800px' }}>
			{children}
		</div>
	</Card>
)
