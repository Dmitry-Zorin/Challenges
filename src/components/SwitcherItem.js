import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SwitcherItem = ({ icon, value, active, onClick }) => (
	<li className={(active ? 'uk-active' : '') + ' uk-text-center'}>
		<a href='/#' onClick={e => {
			e.preventDefault()
			onClick()
		}}>
			<FontAwesomeIcon
				icon={icon}
				className='icon-left-2'
				transform='shrink-2'
			/>
			{value}
		</a>
	</li>
)
