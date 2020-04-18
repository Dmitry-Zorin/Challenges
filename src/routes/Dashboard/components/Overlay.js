import { upperFirst } from 'lodash'
import React from 'react'

const Overlay = ({ text }) => (
	<div
		className='uk-overlay uk-overlay-default uk-position-right uk-transition-slide-right uk-hidden-touch'
		style={{ width: '5.5em' }}
	>
		<p className='font-size-medium uk-position-center'>
			{upperFirst(text)}
		</p>
	</div>
)

export default Overlay
