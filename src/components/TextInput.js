import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedDiv from 'components/animated/AnimatedDiv'
import { motion } from 'framer-motion'
import { upperFirst } from 'lodash'
import React from 'react'

const TextInput = ({ type = 'text', icon, label, value = '', defaultValue = label, setState, capital, className, style, ...props }) => (
	<AnimatedDiv className='uk-margin-medium'>
		<p className='uk-text-primary'>
			{icon && <FontAwesomeIcon transform='shrink-5 down-1' {...{ icon }}/>}
			{upperFirst(label)}
		</p>
		<motion.input
			maxLength='250'
			className='uk-input'
			placeholder={value ? undefined : defaultValue}
			onChange={({ target: { value } }) => {
				setState(capital ? upperFirst(value) : value)
			}}
			style={{ marginTop: '0.5em', ...style }}
			{...{ type, value, ...props }}
			animated
		/>
	</AnimatedDiv>
)

export default TextInput
