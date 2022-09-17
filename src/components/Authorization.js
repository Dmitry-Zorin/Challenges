import { Button, ButtonGroup, InnerLayout, TextInput } from 'components'
import { NotificationContext, RequestContext, UserContext } from 'contexts'
import errors from 'data/notifications/errors.json'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
			? addNotification(errors.invalid)
			: authorize(action, { username, password })
					.then((user) => {
						if (!user) return
						login(user)
						navigate('/')
					})
					.catch(() => {})
	}

	const buttonProps = items
		? {
				icon: 'paper-plane',
				value: 'submit',
		  }
		: {
				icon: 'user-plus',
				value: 'create account',
		  }

	return (
		<InnerLayout items={items}>
			{!items && (
				<p className="text-xlarge uk-text-center padding">
					Start using
					<span className="uk-text-primary uk-text-bold"> Challenges </span>
					with one simple step!
				</p>
			)}
			<form className="uk-form" onSubmit={onSubmit}>
				<TextInput
					icon="user"
					label="username"
					value={username}
					setState={setUsername}
				/>
				<TextInput
					type="password"
					icon="lock"
					label="password"
					value={password}
					setState={setPassword}
				/>
				<ButtonGroup>
					<Button submit type="primary" {...buttonProps} />
				</ButtonGroup>
			</form>
		</InnerLayout>
	)
}

export default Authorization
