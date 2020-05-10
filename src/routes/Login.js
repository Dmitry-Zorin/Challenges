import Authorization from 'components/Authorization'
import DataContext from 'contexts/DataContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { logout } from 'scripts/requests'

const authOptions = {
	login: {
		action: 'login',
		title: 'log in',
		icon: 'sign-in-alt',
	},
	signUp: {
		action: 'signUp',
		title: 'sign up',
		icon: 'user-plus',
	},
}

const Login = (props) => {
	const context = useContext(DataContext)
	
	const [authOption, setAuthOption] = useState(authOptions.login)
	
	const isFirstRenderRef = useRef(true)
	
	useEffect(() => {
		if (!isFirstRenderRef.current) return
		isFirstRenderRef.current = false
		
		if (!context.userInfo?.username) return
		
		logout(context)
			.then(() => {
				props.logout()
				localStorage.clear()
			})
			.catch(() => {})
	}, [context, props])
	
	const items = Object.values(authOptions).map(o => ({
		icon: o.icon,
		value: o.title,
		active: o.action === authOption.action,
		onClick: () => setAuthOption(o),
	}))
	
	return <Authorization action={authOption.action} {...{ items, ...props }}/>
}

export default Login
