import AnimatedButton from 'components/animated/AnimatedButton'
import ButtonGroup from 'components/ButtonGroup'
import React from 'react'

const ActionButtons = ({ saveValue, withCancel, ...props }) => (
	<ButtonGroup {...props}>
		{withCancel && (
			<AnimatedButton
				type='primary'
				value='Cancel'
				icon='times-circle'
				onClick={() => window.history.back()}
			/>
		)}
		<AnimatedButton
			type='primary'
			value={saveValue}
			icon={withCancel ? 'check-circle' : 'plus-circle'}
			submit
		/>
	</ButtonGroup>
)

export default ActionButtons
