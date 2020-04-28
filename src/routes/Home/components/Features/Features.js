import React from 'react'
import features from 'routes/Home/data/features'
import { Card, Flex, List } from 'uikit-react'
import { Column, Divider } from './components'
import { container } from './Features.module.scss'

const Features = () => (
	<Card className={container}>
		<Flex className='uk-height-1-1'>
			<List
				className='
					uk-flex
					uk-flex-wrap
					uk-flex-wrap-stretch
					uk-text-center
					uk-child-width-1-1
					uk-child-width-expand@m
				'
			>
				{features.map(({ component, ...props }, i) => (
					<React.Fragment key={i}>
						<Column {...props}>{component()}</Column>
						{i < features.length - 1 && <Divider/>}
					</React.Fragment>
				))}
			</List>
		</Flex>
	</Card>
)

export default Features
