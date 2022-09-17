import Authorization from 'components/Authorization'
import { RequestContext, UserContext } from 'contexts'
import { useContext, useEffect, useRef, useState } from 'react'

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

const Login = () => {
	const { userInfo, logout: logoutUser } = useContext(UserContext)
	const { logout } = useContext(RequestContext)

	const [authOption, setAuthOption] = useState(authOptions.login)

	const isFirstRenderRef = useRef(true)

	useEffect(() => {
		if (!isFirstRenderRef.current) return
		isFirstRenderRef.current = false

		if (!userInfo?.username) return

		logout(userInfo.username)
			.then(() => {
				logoutUser()
				localStorage.clear()
			})
			.catch(() => {})
	}, [userInfo, logout, logoutUser])

	const items = Object.values(authOptions).map((o) => ({
		icon: o.icon,
		value: o.title,
		active: o.action === authOption.action,
		onClick: () => setAuthOption(o),
	}))

	return <Authorization action={authOption.action} {...{ items }} />
}

export default Login
