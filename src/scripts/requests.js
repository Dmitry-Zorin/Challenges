import axios from 'axios'
import challenges from 'data/notifications/challenges.json'
import errors from 'data/notifications/errors.json'
import user from 'data/notifications/user.json'
import { upperFirst } from 'lodash'
import { addNotification } from 'scripts/notification'
import { handleError } from 'scripts/utils'

const server = process.env.NODE_ENV === 'production' ? ''
	: `http://${window.location.hostname}:${process.env.REACT_APP_API_PORT}`

const apiServer = server + '/api'

const challengeQuery = `{
	_id name difficulty startDate endDate
}`

const challengesQuery = `challenges {
	ongoing ${challengeQuery}
	upcoming ${challengeQuery}
	completed ${challengeQuery}
}`

const settingsQuery = `settings {
	theme
}`

const userQuery = `{
	username
	${challengesQuery}
	${settingsQuery}
}`

// Shortcuts
const resolve = args => Promise.resolve(args)
const reject = args => Promise.reject(args)

export const getUserInfo = (context) => (
	postQuery(
		context,
		`{ user { user ${userQuery} } }`,
		'get user info',
	)
		.then(res => (
			res?.user !== undefined
				? resolve(res.user)
				: reject(addNotification(context, errors.response))
		))
		.catch(reject)
)

export const authorize = (context, action, variables) => {
	const query = `mutation($username: String!, $password: String!) {
    ${action}(username: $username, password: $password) {
      user ${userQuery}
    }
  }`
	const actionName = `${action.slice(0, -2)} ${action.slice(-2).toLowerCase()}`
	
	return postQuery(context, query, actionName, variables)
		.then(res => {
			if (res?.user === null) {
				return reject(addNotification(context, errors[action]))
			}
			if (res?.user === undefined) {
				return reject(addNotification(context, errors.response))
			}
			addNotification(context, { ...user[action], message: res.user.username })
			return resolve(res.user)
		})
		.catch(reject)
}

export const logout = (context) => (
	postQuery(
		context,
		'mutation { logout { user { username } } }',
		'log out',
	)
		.then(res => {
			if (res?.user) {
				return reject(addNotification(context, errors.logout))
			}
			if (res?.user === undefined) {
				return reject(addNotification(context, errors.response))
			}
			addNotification(
				context,
				{ ...user.logout, message: context.userInfo.username },
			)
		})
		.catch(reject)
)

export const saveSettings = (context, settings) => {
	const query = `mutation($theme: String!) {
		settingsEdit(
			settings: {
				theme: $theme
			}
		) {
			${settingsQuery}
		}
	}`
	return postQuery(context, query, 'save user settings', settings)
		.then(res => {
			if (res?.settings === null) {
				return reject(addNotification(context, errors.settings))
			}
			if (res?.settings === undefined) {
				return reject(addNotification(context, errors.response))
			}
			addNotification(context, user.settings)
		})
		.catch(reject)
}

export const saveChallenge = (context, action, variables) => {
	const info = {
		create: {
			id: '',
			idVar: '',
			api: 'challengeAdd',
			action: 'create',
		},
		edit: {
			id: '$id: String!',
			idVar: 'id: $id',
			api: 'challengeEdit',
			action: 'update',
		},
	}[action]
	
	const query = `mutation(
    ${info.id}
    $name: String!
    $difficulty: Difficulty
    $duration: Float
    $delay: Float
  ) {
    ${info.api}(
      ${info.idVar}
      challenge: {
        name: $name
        difficulty: $difficulty
        duration: $duration
        delay: $delay
      }
    ) {
      ${challengesQuery}
    }
  }`
	
	return postQuery(
		context,
		query,
		`${info.action} challenge`,
		variables,
	)
		.then(res => {
			if (!res?.challenges)
				return reject(addNotification(context, errors.response))
			
			addNotification(
				context,
				{ ...challenges[action], message: variables.name },
			)
			return resolve(res.challenges)
		})
		.catch(reject)
}

export const updateChallenge = (context, action, variables, name) => {
	const query = `mutation($id: String!) {
    challenge${upperFirst(action)}(id: $id) {
      ${challengesQuery}
    }
  }`
	return postQuery(context, query, action, variables)
		.then(res => {
			if (!res?.challenges)
				return reject(addNotification(context, errors.response))
			
			addNotification(context, { ...challenges[action], message: name })
			return resolve(res.challenges)
		})
		.catch(reject)
}

const postQuery = (context, query, action, variables) => {
	const api = query.match(/{\s*([^({ ]+)\s*[({]/)[1]
	context.showSpinner()
	
	return axios.post(
		apiServer,
		{ query: query.replace(/\s+/g, ' '), variables },
		{ withCredentials: true },
	)
		.then(res => resolve(res.data.data[api]))
		.catch(err => reject(handleError(context, err, `Failed to ${action}`)))
		.finally(() => context.showSpinner(false))
}
