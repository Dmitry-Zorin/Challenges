import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import React from 'react'
import { Margin } from 'uikit-react'

const TextInput = ({ type = 'text', icon, label, value = '', defaultValue = label, setState, capital }) => (
	<Margin type='medium'>
		<p className='uk-text-primary' style={{ marginBottom: '0.5em' }}>
			{icon && <FontAwesomeIcon transform='shrink-5 down-1' {...{ icon }}/>}
			{upperFirst(label)}
		</p>
		<input
			maxLength='250'
			className='uk-input'
			placeholder={value ? undefined : defaultValue}
			onChange={({ target: { value } }) => {
				setState(capital ? upperFirst(value) : value)
			}}
			{...{ type, value }}
		/>
	</Margin>
)

export default TextInput
