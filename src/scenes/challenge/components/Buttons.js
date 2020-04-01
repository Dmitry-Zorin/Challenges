import React from 'react'
import { Grid } from 'uikit-react'

export const Buttons = ({ save, saveValue, showCancel }) => (
	<Grid
		className='uk-flex-center uk-child-width-1-3@m uk-child-width-1-2@s'
		style={{ marginTop: '4em' }}
	>
		{showCancel && (
			<Button value='Cancel' onClick={() => window.history.back()}/>
		)}
		<Button value={saveValue} onClick={save}/>
	</Grid>
)

const Button = ({ value, onClick }) => (
	<div>
		<button
			className='round-border uk-button uk-width-expand'
			onClick={onClick}
		>
			{value}
		</button>
	</div>
)
