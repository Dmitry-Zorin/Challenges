import { Button, ButtonGroup, InnerLayout, TextInput } from 'components'
import DataContext from 'contexts/DataContext'
import { invalid } from 'data/notifications/errors.json'
import React, { useCallback, useContext, useState } from 'react'
import { addNotification } from 'scripts/notification'
import { authorize } from 'scripts/requests'

const Authorization = ({ action = 'signUp', items, login, navigate }) => {
	const context = useContext(DataContext)
	
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	
	const onSubmit = useCallback(e => {
		e.preventDefault()
		
		!(username && password)
			? addNotification(context, invalid)
			: authorize(context, action, { username, password })
				.then(user => {
					if (!user) return
					login(user)
					navigate('/')
				})
				.catch(() => {})
	}, [context, username, password, action, login, navigate])
	
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
			<form className='uk-form uk-text-normal' {...{ onSubmit }}>
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
