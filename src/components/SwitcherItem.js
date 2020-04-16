import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const SwitcherItem = ({ icon, value, type, active, onClick }) => (
	<li className={`${active ? 'uk-active' : ''} uk-text-center`}>
		<a href='/#' className={type} onClick={e => onClick(e.preventDefault())}>
			{icon && (
				<FontAwesomeIcon
					className='icon-left-2'
					transform='shrink-3'
					{...{ icon }}
				/>
			)}
			{value}
		</a>
	</li>
)
