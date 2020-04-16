import { DataContext } from 'contexts/DataContext'
import React, { useContext } from 'react'

export const Auth = ({ Component, ...props }) => {
	const { userInfo } = useContext(DataContext)
	
	return userInfo === undefined ? null
		: userInfo.username ? <Component {...props}/>
			: props.navigate('/login') && null
}
