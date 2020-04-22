import ActionButton from 'components/ActionButton'
import ButtonGroup from 'components/ButtonGroup'
import InnerLayout from 'components/InnerLayout'
import TextInput from 'components/TextInput'
import DataContext from 'contexts/DataContext'
import { invalid } from 'data/notifications/errors.json'
import React, { useCallback, useContext, useState } from 'react'
import { addNotification } from 'scripts/notification'
import { authorize } from 'scripts/requests'

const Registration = (props) => {
	const context = useContext(DataContext)
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	
	const submit = useCallback(e => {
		e.preventDefault()
		
		!(username && password) ? addNotification(invalid)
			: authorize(context, 'signUp', { username, password })
				.then(user => {
					if (!user) return
					props.login(user)
					props.navigate('/')
				})
				.catch(() => {})
	}, [context, username, password, props])
	
	return (
		<InnerLayout>
			<p className='font-size-xlarge uk-text-center'>
				Start using
				<span className='uk-text-primary uk-text-bold'> Challenges </span>
				with one simple step!
			</p>
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
					<ActionButton
						type='submit'
						icon='user-plus'
						value='create account'
					/>
				</ButtonGroup>
			</form>
		</InnerLayout>
	)
}

export default Registration
