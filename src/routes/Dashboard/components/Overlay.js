import { upperFirst } from 'lodash'
import React from 'react'

const Overlay = ({ text }) => (
	<div
		className='uk-overlay uk-overlay-default uk-position-right uk-hidden-touch uk-transition-slide-right'
		style={{ width: '5.5em' }}
	>
		<p className='uk-text-primary font-size-medium uk-position-center'>
			{upperFirst(text)}
		</p>
	</div>
)

export default Overlay
