import axios from 'axios'
import { NotificationContext, SpinnerContext } from 'contexts/index'
import challenges from 'data/notifications/challenges.json'
import errors from 'data/notifications/errors.json'
import user from 'data/notifications/user.json'
import { upperFirst } from 'lodash'
import React, { createContext, useContext } from 'react'

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

const RequestContext = createContext()

export const RequestProvider = ({ children }) => {
	const { showSpinner } = useContext(SpinnerContext)
	const { addNotification } = useContext(NotificationContext)
	
	const postQuery = (query, action, variables) => {
		const api = query.match(/{\s*([^({ ]+)\s*[({]/)[1]
		showSpinner()
		
		return axios.post(
			apiServer,
			{ query: query.replace(/\s+/g, ' '), variables },
			{ withCredentials: true },
		)
			.then(res => resolve(res.data.data[api]))
			.catch(err => {
				const errors = err.response?.data?.errors
				if (errors) console.log('Errors', errors.map(e => e.message))
				reject(addNotification({
					title: 'Error',
					message: `Failed to ${action}`,
					type: 'danger',
				}))
			})
			.finally(() => showSpinner(false))
	}
	
	const requests = {
		getUserInfo: () => (
			postQuery(`{ user { user ${userQuery} } }`, 'get user info')
				.then(res => (
					res?.user !== undefined
						? resolve(res.user)
						: reject(addNotification(errors.response))
				))
				.catch(reject)
		),
		
		authorize: (action, variables) => {
			const query = `mutation($username: String!, $password: String!) {
		    ${action}(username: $username, password: $password) {
		      user ${userQuery}
		    }
		  }`
			const actionName = `${
				action.slice(0, -2)} ${action.slice(-2).toLowerCase()
			}`
			
			return postQuery(query, actionName, variables)
				.then(res => {
					if (res?.user === null) {
						return reject(addNotification(errors[action]))
					}
					if (res?.user === undefined) {
						return reject(addNotification(errors.response))
					}
					addNotification({ ...user[action], message: res.user.username })
					return resolve(res.user)
				})
				.catch(reject)
		},
		
		logout: (message) => (
			postQuery('mutation { logout { user { username } } }', 'log out')
				.then(res => {
					if (res?.user) {
						return reject(addNotification(errors.logout))
					}
					if (res?.user === undefined) {
						return reject(addNotification(errors.response))
					}
					addNotification({
						...user.logout,
						message,
					})
				})
				.catch(reject)
		),
		
		saveSettings: (settings) => {
			const query = `mutation($theme: String!) {
				settingsEdit(settings: { theme: $theme }) {
					${settingsQuery}
				}
			}`
			return postQuery(query, 'save user settings', settings)
				.then(res => {
					if (res?.settings === null) {
						return reject(addNotification(errors.settings))
					}
					if (res?.settings === undefined) {
						return reject(addNotification(errors.response))
					}
					addNotification(user.settings)
				})
				.catch(reject)
		},
		
		saveChallenge: (action, variables) => {
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
			
			return postQuery(query, `${info.action} challenge`, variables)
				.then(res => {
					if (!res?.challenges) {
						return reject(addNotification(errors.response))
					}
					addNotification({ ...challenges[action], message: variables.name })
					return resolve(res.challenges)
				})
				.catch(reject)
		},
		
		updateChallenge: (action, variables, name) => {
			const query = `mutation($id: String!) {
		    challenge${upperFirst(action)}(id: $id) {
		      ${challengesQuery}
		    }
		  }`
			return postQuery(query, action, variables)
				.then(res => {
					if (!res?.challenges)
						return reject(addNotification(errors.response))
					
					addNotification({ ...challenges[action], message: name })
					return resolve(res.challenges)
				})
				.catch(reject)
		},
	}
	
	return (
		<RequestContext.Provider value={requests}>
			{children}
		</RequestContext.Provider>
	)
}

export default RequestContext
