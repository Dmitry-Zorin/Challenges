import React, { useContext } from 'react'
import { DataContext } from 'contexts/DataContext'

export const Auth = ({ Component, ...props }) => {
	const context = useContext(DataContext)
	
	return context.userIsAuthorized ? <Component {...props}/>
		: context.userIsAuthorized === undefined ? null
			: props.navigate('/login') && null
}
