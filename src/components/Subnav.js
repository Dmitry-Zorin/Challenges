import { Button, ButtonGroup } from 'components'
import React from 'react'

const Subnav = ({ items, ...props }) => (
	<ButtonGroup {...props}>
		{items.map(({ active, type = 'primary', ...props }) => (
			<Button
				key={props.value}
				className='switcher'
				type={active ? type : 'default'}
				{...props}
			/>
		))}
	</ButtonGroup>
)

export default Subnav
