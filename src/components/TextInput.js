import React from 'react'

export const TextInput = ({ label, value, handleChange, defaultValue, isPassword }) => (
	<div className='uk-margin-medium'>
		<label>
			{label}
			<input
				type={isPassword ? 'password' : 'text'}
				className='uk-input'
				value={value || ''}
				placeholder={value ? undefined : defaultValue || label.toLowerCase()}
				onChange={e => handleChange(label.toLowerCase(), e.target.value)}
			/>
		</label>
	</div>
)
