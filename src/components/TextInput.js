import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const TextInput = ({ icon, label, value, handleChange, defaultValue, isPassword }) => (
	<div className='uk-margin-medium'>
		<label>
			{icon && (
				<FontAwesomeIcon
					icon={icon}
					className='icon-left'
					transform='shrink-2'
				/>
			)}
			{label}
			<input
				type={isPassword ? 'password' : 'text'}
				className='uk-input'
				maxLength='250'
				value={value || ''}
				placeholder={value ? undefined : defaultValue || label.toLowerCase()}
				onChange={e => handleChange(label.toLowerCase(), e.target.value)}
			/>
		</label>
	</div>
)
