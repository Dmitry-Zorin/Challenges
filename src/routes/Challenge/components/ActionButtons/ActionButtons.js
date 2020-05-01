import ActionButton from 'components/ActionButton'
import ButtonGroup from 'components/ButtonGroup'
import React from 'react'

const ActionButtons = ({ saveValue, withCancel }) => (
	<ButtonGroup padding>
		{withCancel && (
			<ActionButton
				value='Cancel'
				icon='times-circle'
				onClick={() => window.history.back()}
			/>
		)}
		<ActionButton
			value={saveValue}
			icon={withCancel ? 'check-circle' : 'plus-circle'}
			submit
		/>
	</ButtonGroup>
)

export default ActionButtons
