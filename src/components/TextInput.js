import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const TextInput = ({ type = 'text', icon, label, value = '', defaultValue = label, setState }) => (
	<div className='uk-margin-medium uk-text-capitalize'>
		<FontAwesomeIcon transform='shrink-4' {...{ icon }}/>
		{label}
		<input
			maxLength='250'
			className='uk-input'
			placeholder={value ? undefined : defaultValue}
			onChange={e => setState(e.target.value)}
			style={{ marginTop: '0.5em' }}
			{...{ type, value }}
		/>
	</div>
)
