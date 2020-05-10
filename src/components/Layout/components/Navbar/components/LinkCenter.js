import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataContext from 'contexts/DataContext'
import React, { useContext } from 'react'

const LinkCenter = () => {
	const { spinnerIsVisible } = useContext(DataContext)
	
	return !spinnerIsVisible ? null : (
		<a href='/#' onClick={e => e.preventDefault()}>
			<FontAwesomeIcon icon='spinner' transform='grow-10' spin/>
		</a>
	)
}

export default LinkCenter
