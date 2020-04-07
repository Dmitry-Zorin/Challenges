import axios from 'axios'
import { handleError } from 'scripts/utils'

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

export const getUserInfo = (context) => (
	postQuery(
		context,
		`{ user { user ${challengesQuery} } }`,
		'get user info',
	)
)

export const authorize = (context, action, variables) => {
	const api = action.replace(' ', '').toLowerCase()
	const query = `mutation($username: String!, $password: String!) {
    ${api}(username: $username, password: $password) {
      user ${challengesQuery}
    }
  }`
	return postQuery(context, query, action, variables)
}

export const logout = (context) => (
	postQuery(
		context,
		'mutation { logout { user { username } } }',
		'log out',
	)
)

export const getChallenges = (context) => (
	postQuery(
		context,
		`{ challenges ${challengesQuery} }`,
		'get challenges',
	)
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
}

export const updateChallenge = (context, action, variables) => {
	const query = `mutation($id: String!) {
    challenge${action}(id: $id) ${challengesQuery}
  }`
	return postQuery(context, query, action.toLowerCase(), variables)
}

const postQuery = (context, query, action, variables) => {
	const api = query.match(/{\s*([^({ ]+)\s*[({]/)[1]
	context.showSpinner()
	
	return axios.post(
		context.apiServer,
		{ query, variables },
		{ withCredentials: true },
	)
		.then(({ data }) => data.data[api])
		.catch(err => {
			handleError(err, `Failed to ${action}`)
			return null
		})
		.finally(context.hideSpinner)
}
