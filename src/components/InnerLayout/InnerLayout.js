import React from 'react'
import { Card, Grid } from 'uikit-react'
import styles from './InnerLayout.module.scss'
import { Link } from '@reach/router'
import { capitalize } from 'lodash'

export const InnerLayout = ({ title, children, left, right }) => (
	<Card className={styles.innerLayout}>
		<div className='uk-align-center' style={{ maxWidth: '800px' }}>
			<Grid className='uk-margin-bottom'>
				{left && (
					<Link to={left} className='uk-text-muted uk-text-left uk-width-auto'>
						{left.slice(1)}
					</Link>
				)}
				{title && (
					<p className='uk-h2 uk-text-center uk-width-expand'>{capitalize(title)}</p>
				)}
				{right && (
					<Link to={right}
						className='uk-text-muted uk-text-right uk-width-auto'>
						{right.slice(1)}
					</Link>
				)}
			</Grid>
			{children}
		</div>
	</Card>
)
