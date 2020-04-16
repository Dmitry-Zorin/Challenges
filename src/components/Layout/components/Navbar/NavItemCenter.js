import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataContext } from 'contexts/DataContext'
import React, { useContext } from 'react'

export const NavItemCenter = () => {
	const { spinnerIsVisible } = useContext(DataContext)
	
	return !spinnerIsVisible ? null : (
		<a href='/#' onClick={e => e.preventDefault()}>
			<FontAwesomeIcon icon='spinner' transform='grow-10' spin/>
		</a>
	)
}
