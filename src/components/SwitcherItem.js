import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SwitcherItem = ({ icon, value, type, active, onClick }) => (
	<li className={`${active ? 'uk-active' : ''} uk-text-center`}>
		<a href='/#' className={type} onClick={e => onClick(e.preventDefault())}>
			{icon && <FontAwesomeIcon transform='shrink-3'{...{ icon }}/>}
			{value}
		</a>
	</li>
)

export default SwitcherItem
