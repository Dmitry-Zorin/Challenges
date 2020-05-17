import { useNavigate } from '@reach/router'
import { Button, ButtonGroup, InnerLayout, TextInput } from 'components'
import { NotificationContext, RequestContext, UserContext } from 'contexts'
import { invalid } from 'data/notifications/errors.json'
import React, { useContext, useState } from 'react'

const Authorization = ({ action = 'signUp', items }) => {
	const { authorize } = useContext(RequestContext)
	const { addNotification } = useContext(NotificationContext)
	const { login } = useContext(UserContext)
	
	const navigate = useNavigate()
	
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	
	const onSubmit = (e) => {
		e.preventDefault()
		
		!(username && password)
			? addNotification(invalid)
			: authorize(action, { username, password })
				.then(user => {
					if (!user) return
					login(user)
					navigate('/')
				})
				.catch(() => {})
	}
	
	const buttonProps = items ? {
		icon: 'paper-plane',
		value: 'submit',
	} : {
		icon: 'user-plus',
		value: 'create account',
	}
	
	return (
		<InnerLayout {...{ items }}>
			{!items && (
				<p className='text-xlarge uk-text-center padding'>
					Start using
					<span className='uk-text-primary uk-text-bold'> Challenges </span>
					with one simple step!
				</p>
			)}
			<form className='uk-form' {...{ onSubmit }}>
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
					<Button type='primary' {...buttonProps} submit/>
				</ButtonGroup>
			</form>
		</InnerLayout>
	)
}

export default Authorization
