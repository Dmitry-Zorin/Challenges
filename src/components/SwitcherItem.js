import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedSwitcherItem from 'components/Animated/AnimatedSwitcherItem'
import React from 'react'

const SwitcherItem = ({ icon, value, type, active, onClick }) => (
	<AnimatedSwitcherItem className={active ? 'uk-active' : ''}>
		<a href='/#' className={type} onClick={e => onClick(e.preventDefault())}>
			{icon && <FontAwesomeIcon transform='shrink-3 down-0.75' {...{ icon }}/>}
			{value}
		</a>
	</AnimatedSwitcherItem>
)

export default SwitcherItem
