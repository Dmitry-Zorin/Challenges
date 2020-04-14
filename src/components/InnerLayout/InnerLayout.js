import React from 'react'
import { Card, Grid } from 'uikit-react'
import { innerLayout, sideLink } from './InnerLayout.module.scss'
import { Link } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const transform = 'shrink-3 down-0.5'

export const InnerLayout = ({ title, children, left, right }) => (
	<Card className={innerLayout}>
		<div className='uk-align-center' style={{ maxWidth: '800px' }}>
			<Grid className='uk-margin-bottom uk-margin-remove-left'>
				<Title title={title} className='uk-hidden@s uk-width-1-1'/>
				{left && (
					<Link to={left} className={`${sideLink} uk-text-capitalize`}>
						<FontAwesomeIcon
							icon='chevron-left'
							className='icon-left'
							transform={transform}
						/>
						{left.slice(1)}
					</Link>
				)}
				<Title title={title} className='uk-visible@s uk-width-expand'/>
				{right && (
					<Link
						to={right}
						className={`${sideLink} uk-text-capitalize uk-text-right`}
					>
						{right.slice(1)}
						<FontAwesomeIcon
							icon='chevron-right'
							className='icon-right'
							transform={transform}
						/>
					</Link>
				)}
			</Grid>
			{children}
		</div>
	</Card>
)

const Title = ({ title, className }) => (
	<p className={`
		${className}
		font-size-xlarge
		uk-padding-remove-left
		uk-text-center
		uk-text-capitalize
	`}>
		{title}
	</p>
)
