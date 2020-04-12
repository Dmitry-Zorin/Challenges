import React, { useContext } from 'react'
import { DataContext } from 'contexts/DataContext'

export const Auth = ({ Component, ...props }) => {
	const context = useContext(DataContext)
	
	return context.userInfo === undefined ? null
		: context.userInfo.username ? <Component {...props}/>
			: props.navigate('/login') && null
}
