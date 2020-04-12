import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { Button } from 'uikit-react'
import { InnerLayout } from 'components/InnerLayout'
import { DataContext } from 'contexts/DataContext'
import { SwitcherItem } from 'components/SwitcherItem'
import { TextInput } from 'components/TextInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faLock,
	faPaperPlane,
	faSignInAlt,
	faUser,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { authorize, logout } from 'scripts/requests'
import { addNotification } from 'scripts/notifications'
import { invalid } from 'data/notifications/errors.json'

const authOptions = {
	login: {
		action: 'login',
		title: 'log in',
		icon: faSignInAlt,
	},
	signUp: {
		action: 'signUp',
		title: 'sign up',
		icon: faUserPlus,
	},
}

export const Login = (props) => {
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
			.then(() => {
				localStorage.clear()
				props.logout()
			})
			.catch(() => {})
	}, [context, props])
	
	const submit = useCallback(e => {
		e.preventDefault()
		!username || !password ? addNotification(invalid)
			: authorize(context, authOption.action, { username, password })
				.then(user => {
					if (!user) return
					props.login(user)
					props.navigate('/')
				})
				.catch(() => {})
	}, [authOption.action, context, username, password, props])
	
	return (
		<InnerLayout>
			<ul style={{ marginTop: '1.5em' }} className={`
				uk-subnav
				uk-subnav-pill
				uk-flex-center
				uk-child-width-1-2
				uk-child-width-1-3@m
			`}>
				{Object.values(authOptions).map(o => (
					<SwitcherItem
						key={o.action}
						icon={o.icon}
						value={o.title}
						active={o.action === authOption.action}
						onClick={() => setAuthOption(o)}
					/>
				))}
			</ul>
			<form className='uk-form uk-margin-medium-top' onSubmit={submit}>
				<TextInput
					icon={faUser}
					label='username'
					value={username}
					setState={setUsername}
				/>
				<TextInput
					icon={faLock}
					label='password'
					value={password}
					setState={setPassword}
					isPassword={true}
				/>
				<Button
					className='uk-align-center uk-width-1-3@m uk-width-1-2@s'
					style={{ marginTop: '4em' }}
				>
					<FontAwesomeIcon
						icon={faPaperPlane}
						className='icon-left-2'
						transform='shrink-3'
					/>
					Submit
				</Button>
			</form>
		</InnerLayout>
	)
}
