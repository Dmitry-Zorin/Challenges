import React from 'react'
import { Card, Flex, Margin } from 'uikit-react'
import { SideLink, Title } from './components'
import { card } from './InnerLayout.module.scss'

const InnerLayout = ({ title, children, left, right }) => (
	<Card className={card}>
		<Margin
			type='bottom'
			className='uk-align-center'
			style={{ maxWidth: '800px' }}
		>
			<Title className='uk-hidden@s' {...{ title }}/>
			<Flex className='uk-flex-between'>
				{left && <SideLink to={left} side='left'/>}
				<Title className='uk-visible@s' {...{ title }}/>
				{right && <SideLink to={right} side='right'/>}
			</Flex>
			<Margin type={`${title ? 'medium-' : ''}top`}>
				{children}
			</Margin>
		</Margin>
	</Card>
)

export default InnerLayout
