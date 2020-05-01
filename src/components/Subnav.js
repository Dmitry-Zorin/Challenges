import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedButton from 'components/animated/AnimatedButton'
import ButtonGroup from 'components/ButtonGroup'
import React from 'react'

const Subnav = ({ items, padding = false }) => (
	<ButtonGroup
		className={
			padding ? 'uk-padding-small uk-padding-remove-horizontal' : ''
		}
	>
		{items.map(({ icon, value, active, type = 'primary', ...props }) => (
			<div key={value} className='uk-margin-remove uk-width-1-3@m'>
				<AnimatedButton
					className={`uk-width-1-1 uk-button-${active
						? type
						: 'default'} switcher`}
					{...props}
				>
					{icon && <FontAwesomeIcon transform='shrink-3 down-1' {...{ icon }}/>}
					{value}
				</AnimatedButton>
			</div>
		))}
	</ButtonGroup>
)

export default Subnav
