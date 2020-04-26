import AnimatedCard from 'components/animated/AnimatedCard'
import React from 'react'
import { Margin } from 'uikit-react'
import Info from './components/Info'
import { container } from './LeftColumn.module.scss'

const LeftColumn = () => (
	<Margin type='remove' className='uk-width-auto uk-width-1-3@m'>
		<div className={`uk-visible@m ${container}`}>
			<AnimatedCard className='uk-height-1-1'>
				<Info/>
			</AnimatedCard>
		</div>
		<div id='info' data-uk-offcanvas='overlay: true'>
			<div className='uk-offcanvas-bar'>
				<Info/>
			</div>
		</div>
	</Margin>
)

export default LeftColumn
