import axios from 'axios'
import { addNotification, handleError } from 'scripts/utils'
import errors from 'data/notifications/errors.json'
import challenges from 'data/notifications/challenges.json'
import { capitalize } from 'lodash'

const server = process.env.NODE_ENV === 'production' ? ''
	: `http://${window.location.hostname}:${process.env.REACT_APP_API_PORT}`

const apiServer = server + '/api'

const challengeQuery = `{
	_id name difficulty startDate endDate
}`

export const challengesQuery = `{
	challenges {
		ongoing ${challengeQuery}
		upcoming ${challengeQuery}
		completed ${challengeQuery}
	}
}`

// Shortcuts
const resolve = args => Promise.resolve(args)
const reject = args => Promise.reject(args)

export const getUserInfo = (context) => (
	postQuery(
		context,
		`{ user { user ${challengesQuery} } }`,
		'get user info',
	)
		.then(res => (
			res?.user !== undefined ? resolve(res.user)
				: reject(addNotification(errors.response))
		))
		.catch(reject)
)

export const authorize = (context, action, variables) => {
	const query = `mutation($username: String!, $password: String!) {
    ${action}(username: $username, password: $password) {
      user ${challengesQuery}
    }
  }`
	const actionName = `${action.slice(0, -2)} ${action.slice(-2).toLowerCase()}`
	
	return postQuery(context, query, actionName, variables)
		.then(res => {
			if (res?.user === null)
				return reject(addNotification(errors[action]))
			
			if (res?.user === undefined)
				return reject(addNotification(errors.response))
			
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
			if (res?.user)
				return reject(addNotification(errors.logout))
			
			if (res?.user === undefined)
				return reject(addNotification(errors.response))
		})
		.catch(reject)
)

export const getChallenges = (context) => (
	postQuery(
		context,
		`{ challenges ${challengesQuery} }`,
		'get challenges',
	)
		.then(res => (
			res?.challenges ? resolve(res.challenges)
				: reject(addNotification(errors.response))
		))
		.catch(reject)
)

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
    $startDate: Float
    $endDate: Float
  ) {
    ${info.api}(
      ${info.idVar}
      challenge: {
        name: $name
        difficulty: $difficulty
        startDate: $startDate
        endDate: $endDate
      }
    ) ${challengesQuery}
  }`
	
	return postQuery(
		context,
		query,
		`${info.action} challenge`,
		variables,
	)
		.then(res => {
			if (!res?.challenges) return reject(addNotification(errors.response))
			
			addNotification({
				...challenges[`${action}ed`.replace('ee', 'e')],
				message: variables.name,
			})
			return resolve(res.challenges)
		})
		.catch(reject)
}

export const updateChallenge = (context, action, variables, name) => {
	const query = `mutation($id: String!) {
    challenge${capitalize(action)}(id: $id) ${challengesQuery}
  }`
	return postQuery(context, query, action, variables)
		.then(res => {
			if (!res?.challenges) return reject(addNotification(errors.response))
			
			addNotification({
				...challenges[`${action}ed`.replace('ee', 'e')],
				message: name,
			})
			return resolve(res.challenges)
		})
		.catch(reject)
}

const postQuery = (context, query, action, variables) => {
	const api = query.match(/{\s*([^({ ]+)\s*[({]/)[1]
	context.showSpinner()
	
	return axios.post(apiServer, { query, variables }, { withCredentials: true })
		.then(res => resolve(res.data.data[api]))
		.catch(err => reject(handleError(err, `Failed to ${action}`)))
		.finally(() => context.showSpinner(false))
}
