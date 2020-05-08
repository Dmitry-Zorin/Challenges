import AnimatedCard from 'components/animated/AnimatedCard'
import React from 'react'
import features from 'routes/Home/features'
import { container } from './Features.module.scss'

const Features = () => (
	<AnimatedCard className={`${container} uk-padding`}>
		<div className='uk-grid-divider uk-child-width-expand@m' data-uk-grid>
			{features.map(({ Component }, i) => <Component key={i}/>)}
		</div>
	</AnimatedCard>
)

export default Features
