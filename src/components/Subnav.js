import AnimatedButton from 'components/animated/AnimatedButton'
import ButtonGroup from 'components/ButtonGroup'
import React from 'react'

const Subnav = ({ items, ...props }) => (
	<ButtonGroup {...props}>
		{items.map(({ active, type = 'primary', ...props }) => (
			<AnimatedButton
				key={props.value}
				className='switcher'
				type={active ? type : 'default'}
				{...props}
			/>
		))}
	</ButtonGroup>
)

export default Subnav
