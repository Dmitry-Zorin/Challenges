import ActionButton from 'components/ActionButton'
import ButtonGroup from 'components/ButtonGroup'
import InnerLayout from 'components/InnerLayout'
import TextInput from 'components/TextInput'
import DataContext from 'contexts/DataContext'
import { invalid } from 'data/notifications/errors.json'
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { addNotification } from 'scripts/notification'
import { authorize, logout } from 'scripts/requests'
import AuthSubnav from './components/AuthSubnav'

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
	const isFirstRenderRef = useRef(true)
	const [authOption, setAuthOption] = useState(authOptions.login)
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	
	useEffect(() => {
		if (!isFirstRenderRef.current) return
		isFirstRenderRef.current = false
		
		if (!context.userInfo?.username) return
		
		logout(context)
			.then(() => localStorage.clear(props.logout()))
			.catch(() => {})
	}, [context, props])
	
	const submit = useCallback(e => {
		e.preventDefault()
		
		!(username && password) ? addNotification(invalid)
			: authorize(context, authOption.action, { username, password })
				.then(user => {
					if (!user) return
					props.login(user)
					props.navigate('/')
				})
				.catch(() => {})
	}, [context, username, password, authOption.action, props])
	
	return (
		<InnerLayout title={authOption.title}>
			<AuthSubnav {...{ authOption, authOptions, setAuthOption }}/>
			<form className='uk-form uk-margin-medium-top' onSubmit={submit}>
				<TextInput
					icon='user'
					label='username'
					value={username}
					setState={setUsername}
				/>
				<TextInput
					type='password'
					icon='lock'
					label='password'
					value={password}
					setState={setPassword}
				/>
				<ButtonGroup>
					<ActionButton type='submit' icon='paper-plane' value='Submit'/>
				</ButtonGroup>
			</form>
		</InnerLayout>
	)
}

export default Login
