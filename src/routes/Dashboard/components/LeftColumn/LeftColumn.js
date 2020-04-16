import React from 'react'
import { Card } from 'uikit-react'
import { Info } from './components/Info'
import { container } from './LeftColumn.module.scss'

export const LeftColumn = () => (
	<div className='uk-width-auto uk-width-1-3@m uk-margin-remove'>
		<div className={`${container} uk-visible@m`}>
			<Card className='uk-height-1-1'>
				<Info/>
			</Card>
		</div>
		<div id='info' data-uk-offcanvas='overlay: true'>
			<div className='uk-offcanvas-bar'>
				<Info/>
			</div>
		</div>
	</div>
)
