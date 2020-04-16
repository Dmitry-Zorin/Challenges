import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Flex } from 'uikit-react'

export const Buttons = ({ saveValue, withCancel }) => (
	<Flex
		className='uk-flex-center uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m'
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
	</Flex>
)

const ActionButton = ({ value, icon, ...props }) => (
	<div className='uk-margin-remove'>
		<button
			className='uk-button uk-button-default uk-width-1-1'
			{...props}
		>
			<FontAwesomeIcon
				className='icon-left-2'
				transform='shrink-1'
				{...{ icon }}
			/>
			{value}
		</button>
	</div>
)
