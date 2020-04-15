import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const TextInput = ({ icon, label, value = '', setState, defaultValue = label, isPassword }) => (
	<div className='uk-margin-medium uk-text-capitalize'>
		{icon && (
			<FontAwesomeIcon icon={icon} transform='shrink-4'/>
		)}
		{label}
		<input
			type={isPassword ? 'password' : 'text'}
			maxLength='250'
			className='uk-input'
			style={{ marginTop: '0.5em' }}
			value={value}
			placeholder={value ? undefined : defaultValue}
			onChange={e => setState(e.target.value)}
		/>
	</div>
)
