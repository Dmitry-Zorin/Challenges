import React, { useContext } from 'react'
import { DataContext } from 'contexts/DataContext'

export const Auth = ({ Component, ...props }) => {
	const { userInfo } = useContext(DataContext)
	
	return userInfo === undefined ? null
		: userInfo.username ? <Component {...props}/>
			: props.navigate('/login') && null
}
