import ActionButton from 'components/ActionButton'
import ButtonGroup from 'components/ButtonGroup'
import React from 'react'

const ActionButtons = ({ saveValue, withCancel }) => (
	<ButtonGroup>
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
	</ButtonGroup>
)

export default ActionButtons
