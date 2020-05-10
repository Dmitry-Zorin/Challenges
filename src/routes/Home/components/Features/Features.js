import Animation from 'components/Animation'
import Card from 'components/Card'
import React from 'react'
import features from 'routes/Home/features'
import { container } from './Features.module.scss'

const Features = () => (
	<Card className={`${container} uk-padding`}>
		<div className='uk-grid-divider uk-child-width-expand@m' data-uk-grid>
			{features.map(({ Component }, i) => (
				<div key={i}>
					<Animation type='zoom'>
						<Component/>
					</Animation>
				</div>
			))}
		</div>
	</Card>
)

export default Features
