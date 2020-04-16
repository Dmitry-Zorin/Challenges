import React from 'react'

export const Overlay = ({ text }) => (
	<div
		style={{ width: '5.5em' }} className={`
		uk-overlay
		uk-overlay-default
		uk-position-right
		uk-transition-slide-right
		uk-hidden-touch
	`}
	>
		<p className='font-size-medium uk-position-center uk-text-capitalize'>
			{text}
		</p>
	</div>
)
