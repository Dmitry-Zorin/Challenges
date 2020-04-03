import axios from 'axios'
import { store } from 'react-notifications-component'
import { notifications } from './data/notifications'

export const toMs = {
	DAY: 864e5,
	HOUR: 36e5,
	MINUTE: 6e4,
}

export const challengesQuery = ` 
	challenges { 
		_id
		name
		difficulty
		progress
		startDate
		endDate
	}
`

export const getChallenges = apiServer => (
	axios.post(
		apiServer,
		{ query: `{ challenges { ${challengesQuery} } }` },
		{ withCredentials: true },
	)
		.then(({ data: { data } }) => {
			const challenges = data.challenges.challenges
			return challenges ? sortChallenges(challenges) : {}
		})
		.catch(err => {
			handleError(err, 'Failed to get challenges')
			return {}
		})
)

export const sortChallenges = challenges => ({
	ongoing: challenges
		.filter(c => c.progress === 'Ongoing')
		.sort((a, b) => a.endDate - b.endDate),

	upcoming: challenges
		.filter(c => c.progress === 'Upcoming')
		.sort((a, b) => a.startDate - b.startDate),

	completed: challenges
		.filter(c => c.progress === 'Completed')
		.sort((a, b) => b.endDate - a.endDate),
})

export const updateTime = (state, apiServer) => {
	const now = new Date().getTime()
	let stateNeedsUpdate = false

	const updatedState = {
		ongoing: state.ongoing?.map(c => {
			const time = c.endDate - now
			if (time < 0) {
				stateNeedsUpdate = true
				addNotification({
					title: 'Challenge completed!',
					message: c.name,
					type: 'success',
				})
			}
			c.timeLeft = getTimeString(time)
			return c
		}),
		upcoming: state.upcoming?.map(c => {
			const time = c.startDate - now
			if (time < 0) {
				stateNeedsUpdate = true
				addNotification({
					title: 'Challenge started!',
					message: c.name,
				})
			}
			c.startsIn = getTimeString(time)
			return c
		}),
		completed: state.completed,
	}

	return stateNeedsUpdate
		? getChallenges(apiServer)
		: updatedState
}

const getTimeString = ms => {
	const time = getTimeObj(ms)
	const timeStrings = [
		time.days + 'd',
		time.hours + 'h',
		time.minutes + 'm',
	]
	return timeStrings.filter(e => +e[0]).join(' ')
}

export const getTimeObj = ms => ({
	days: ms / toMs.DAY | 0,
	hours: ms % toMs.DAY / toMs.HOUR | 0,
	minutes: Math.ceil(ms % toMs.HOUR / toMs.MINUTE),
})

export const getChallengeTime = c => {
	const space = '\xa0'
	return (
		c.progress === 'Upcoming' ? space + c.startsIn
			: c.progress === 'Ongoing' ? space + c.timeLeft
			: ''
	)
}

export const addNotification = settings => (
	store.addNotification({
		type: 'info',
		insert: 'top',
		container: 'top-right',
		animationIn: ['animated', 'fadeIn'],
		animationOut: ['animated', 'fadeOut'],
		dismiss: { duration: 3000 },
		...settings,
	})
)

export const handleError = (err, message) => {
	console.log(err.toJSON ? err.toJSON() : err)
	addNotification({
		...notifications.error,
		message: message || err.message,
	})
}
