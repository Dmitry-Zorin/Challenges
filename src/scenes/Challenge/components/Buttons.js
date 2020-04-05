import React from 'react'
import { Grid } from 'uikit-react'
import {
	faCheck,
	faPlusCircle,
	faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Buttons = ({ save, saveValue, withCancel }) => (
	<Grid
		className='uk-flex-center uk-child-width-1-3@m uk-child-width-1-2@s'
		style={{ marginTop: '4em' }}
	>
		{withCancel && (
			<Button
				value='Cancel'
				icon={faTimes}
				onClick={() => window.history.back()}
			/>
		)}
		<Button
			value={saveValue}
			icon={withCancel ? faCheck : faPlusCircle}
			onClick={save}
		/>
	</Grid>
)

const Button = ({ value, icon, onClick }) => (
	<div>
		<button
			className='round-border uk-button uk-width-expand'
			onClick={onClick}
		>
			<FontAwesomeIcon
				icon={icon}
				className='icon-left-2'
				transform='shrink-2'
			/>
			{value}
		</button>
	</div>
)
