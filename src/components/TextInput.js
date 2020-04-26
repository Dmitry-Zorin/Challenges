import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedDiv from 'components/animated/AnimatedDiv'
import { upperFirst } from 'lodash'
import React from 'react'

const TextInput = ({ type = 'text', icon, label, value = '', defaultValue = label, setState, capital }) => (
	<AnimatedDiv class='uk-margin-medium'>
		<p className='uk-text-primary'>
			{icon && <FontAwesomeIcon transform='shrink-5 down-0.5' {...{ icon }}/>}
			{upperFirst(label)}
		</p>
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
	</AnimatedDiv>
)

export default TextInput
