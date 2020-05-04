import AnimatedCard from 'components/animated/AnimatedCard'
import React from 'react'
import features from 'routes/Home/data/features'
import { Column, Divider } from './components'
import { container } from './Features.module.scss'

const Features = () => (
	<AnimatedCard className={container}>
		<div className='uk-flex uk-height-1-1 uk-text-center'>
			<ul className='uk-list uk-flex uk-flex-wrap uk-flex-wrap-stretch'>
				{features.map(({ component, ...props }, i) => (
					<React.Fragment key={i}>
						<Column {...props}>{component()}</Column>
						{i < features.length - 1 && <Divider/>}
					</React.Fragment>
				))}
			</ul>
		</div>
	</AnimatedCard>
)

export default Features
