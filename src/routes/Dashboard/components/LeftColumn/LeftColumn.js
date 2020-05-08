import AnimatedCard from 'components/animated/AnimatedCard'
import React from 'react'
import Info from './components/Info'

const LeftColumn = () => (
	<>
		<div className='uk-visible@m uk-flex uk-width-1-3'>
			<AnimatedCard className='uk-width-1-1'>
				<Info/>
			</AnimatedCard>
		</div>
		<div id='info' data-uk-offcanvas='overlay: true'>
			<div className='uk-offcanvas-bar'>
				<Info/>
			</div>
		</div>
	</>
)

export default LeftColumn
