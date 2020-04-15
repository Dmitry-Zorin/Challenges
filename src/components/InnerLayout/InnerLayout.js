import React from 'react'
import { Card, Grid } from 'uikit-react'
import { innerLayout, sideLink } from './InnerLayout.module.scss'
import { Link } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const InnerLayout = ({ title, children, left, right }) => (
	<Card className={innerLayout}>
		<div className='uk-align-center' style={{ maxWidth: '800px' }}>
			<Grid className='uk-margin-bottom uk-margin-remove-left'>
				<Title title={title} className='uk-hidden@s uk-width-1-1'/>
				<SideLink to={left} side='left'/>
				<Title title={title} className='uk-visible@s uk-width-expand'/>
				<SideLink to={right} side='right'/>
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

const SideLink = ({ to, side }) => !to ? null : (
	<Link to={to} className={`${sideLink} uk-text-${side} uk-text-capitalize`}>
		{side === 'right' && to.slice(1)}
		<FontAwesomeIcon
			icon={`chevron-${side}`}
			className={`icon-${side}`}
			transform='shrink-3 down-0.5'
		/>
		{side === 'left' && to.slice(1)}
	</Link>
)
