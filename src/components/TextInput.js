import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import React from 'react'

const TextInput = ({ type = 'text', icon, label, value = '', defaultValue = label, setState, capital }) => (
	<div className='padding-text-top'>
		<p className='uk-text-primary'>
			{icon && <FontAwesomeIcon {...{ icon }}/>}
			{upperFirst(label)}
		</p>
		<input
			className='uk-input'
			placeholder={value ? undefined : defaultValue}
			onChange={({ target: { value } }) => {
				setState(capital ? upperFirst(value) : value)
			}}
			maxLength='250'
			{...{ type, value }}
		/>
	</div>
)

export default TextInput
