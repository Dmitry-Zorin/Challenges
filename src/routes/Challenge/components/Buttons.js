import React from 'react'
import { Button, Grid } from 'uikit-react'
import {
	faCheckCircle,
	faPlusCircle,
	faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Buttons = ({ save, saveValue, withCancel }) => (
	<Grid
		className='uk-flex-center uk-child-width-1-3@m uk-child-width-1-2@s'
		style={{ marginTop: '4em' }}
	>
		{withCancel && (
			<ActionButton
				value='Cancel'
				icon={faTimesCircle}
				onClick={() => window.history.back()}
			/>
		)}
		<ActionButton
			value={saveValue}
			icon={withCancel ? faCheckCircle : faPlusCircle}
			onClick={save}
		/>
	</Grid>
)

const ActionButton = ({ value, icon, onClick }) => (
	<div>
		<Button className='round-border uk-width-expand' onClick={onClick}>
			<FontAwesomeIcon icon={icon} className='icon-left-2'/>
			{value}
		</Button>
	</div>
)
