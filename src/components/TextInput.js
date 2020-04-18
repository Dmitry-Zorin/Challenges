import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import React from 'react'
import { Margin } from 'uikit-react'

const TextInput = ({ type = 'text', icon, label, value = '', defaultValue = label, setState, capital }) => (
	<Margin type='medium'>
		{icon && <FontAwesomeIcon transform='shrink-4' {...{ icon }}/>}
		{upperFirst(label)}
		<input
			maxLength='250'
			className='uk-input'
			placeholder={value ? undefined : defaultValue}
			onChange={({ target: { value } }) => {
				setState(capital ? upperFirst(value) : value)
			}}
			style={{ marginTop: '0.5em' }}
			{...{ type, value }}
		/>
	</Margin>
)

export default TextInput
