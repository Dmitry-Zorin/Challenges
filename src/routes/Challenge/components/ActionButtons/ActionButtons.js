import { Button, ButtonGroup } from 'components'
import React from 'react'

const ActionButtons = ({ saveValue, withCancel, ...props }) => (
	<ButtonGroup {...props}>
		{withCancel && (
			<Button
				type='primary'
				value='Cancel'
				icon='times-circle'
				onClick={() => window.history.back()}
			/>
		)}
		<Button
			type='primary'
			value={saveValue}
			icon={withCancel ? 'check-circle' : 'plus-circle'}
			submit
		/>
	</ButtonGroup>
)

export default ActionButtons
