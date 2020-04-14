import React from 'react'
import { Grid } from 'uikit-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Buttons = ({ saveValue, withCancel }) => (
	<Grid
		className='uk-flex-center uk-child-width-1-3@m uk-child-width-1-2@s'
		style={{ marginTop: '4em' }}
	>
		{withCancel && (
			<ActionButton
				type='button'
				value='Cancel'
				icon='times-circle'
				onClick={() => window.history.back()}
			/>
		)}
		<ActionButton
			type='submit'
			value={saveValue}
			icon={withCancel ? 'check-circle' : 'plus-circle'}
		/>
	</Grid>
)

const ActionButton = ({ type, value, icon, onClick }) => (
	<div>
		<button
			type={type}
			className='uk-button uk-button-default uk-width-expand'
			onClick={onClick}
		>
			<FontAwesomeIcon
				icon={icon}
				className='icon-left-2'
				transform='shrink-1'
			/>
			{value}
		</button>
	</div>
)
