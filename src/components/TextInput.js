import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { capitalize } from 'lodash'
import React from 'react'

export const TextInput = ({ type = 'text', icon, label, value = '', defaultValue = label, setState, capital }) => (
	<div className='uk-margin-medium uk-text-capitalize'>
		{icon && <FontAwesomeIcon transform='shrink-4' {...{ icon }}/>}
		{label}
		<input
			maxLength='250'
			className='uk-input'
			placeholder={value ? undefined : defaultValue}
			onChange={({ target: { value } }) => {
				setState(capital ? capitalize(value) : value)
			}}
			style={{ marginTop: '0.5em' }}
			{...{ type, value }}
		/>
	</div>
)
