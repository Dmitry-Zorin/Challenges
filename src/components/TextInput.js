import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Animation from 'components/Animation'
import { motion } from 'framer-motion'
import { upperFirst } from 'lodash'
import React from 'react'

const TextInput = ({ type = 'text', icon, label, value = '', defaultValue = label, setState, capital }) => (
	<Animation type='fade' className='padding-text-top'>
		<p className='uk-text-primary'>
			{icon && <FontAwesomeIcon {...{ icon }}/>}
			{upperFirst(label)}
		</p>
		<motion.input
			className='uk-input'
			placeholder={value ? undefined : defaultValue}
			onChange={({ target: { value } }) => {
				setState(capital ? upperFirst(value) : value)
			}}
			maxLength='250'
			{...{ type, value }}
			animated
		/>
	</Animation>
)

export default TextInput
