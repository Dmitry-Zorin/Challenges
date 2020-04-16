import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import React from 'react'
import { Card, Flex } from 'uikit-react'
import { innerLayout, sideLink } from './InnerLayout.module.scss'

export const InnerLayout = ({ title, children, left, right }) => (
	<Card className={innerLayout}>
		<div className='uk-align-center' style={{ maxWidth: '800px' }}>
			<Title className='uk-hidden@s' {...{ title }}/>
			<Flex className='uk-margin-bottom uk-flex-between'>
				<SideLink to={left} side='left'/>
				<Title className='uk-visible@s' {...{ title }}/>
				<SideLink to={right} side='right'/>
			</Flex>
			{children}
		</div>
	</Card>
)

const Title = ({ title, className }) => (
	<p
		className={`
			${className}
			font-size-xlarge
			uk-text-center
			uk-text-capitalize
		`}
	>
		{title}
	</p>
)

const SideLink = ({ to, side }) => !to ? null : (
	<Link className={`${sideLink} uk-text-${side} uk-text-capitalize`} {...{ to }}>
		{side === 'right' && to.slice(1)}
		<FontAwesomeIcon
			icon={`chevron-${side}`}
			className={`icon-${side}`}
			transform='shrink-3 down-0.5'
		/>
		{side === 'left' && to.slice(1)}
	</Link>
)
