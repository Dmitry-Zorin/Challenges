import React from 'react'
import features from 'routes/Home/data/features'
import { Card, Flex } from 'uikit-react'
import { Column, Divider } from './components'
import { container } from './Features.module.scss'

const Features = () => (
	<Card className={container}>
		<Flex className='uk-height-1-1'>
			<Flex className='uk-flex-wrap uk-flex-wrap-stretch uk-text-center'>
				{features.map(({ component, ...props }, i) => (
					<>
						<Column {...props}>{component()}</Column>
						{i < features.length - 1 && <Divider/>}
					</>
				))}
			</Flex>
		</Flex>
	</Card>
)

export default Features
