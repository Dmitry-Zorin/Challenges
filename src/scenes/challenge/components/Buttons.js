import React from 'react'
import styles from './Buttons.module.scss'
import { Grid } from 'uikit-react'

export const Buttons = ({ save, saveValue, showCancel }) => (
	<Grid className={
		styles.marginTop +
		' uk-flex-center uk-child-width-1-3@m uk-child-width-1-2@s'
	}>
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
