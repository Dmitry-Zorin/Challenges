import axios from 'axios'
import { store } from 'react-notifications-component'
import { notifications } from '../data/notifications'

export const toMs = {
	DAY: 864e5,
	HOUR: 36e5,
	MINUTE: 6e4,
}

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

export const getChallenges = apiServer => (
	axios.post(
		apiServer,
		{ query: `{ challenges ${challengesQuery} }` },
		{ withCredentials: true },
	)
		.then(({ data: { data } }) => data.challenges.challenges)
		.catch(err => {
			handleError(err, 'Failed to get challenges')
			return null
		})
)

export const updateTime = async (challenges, apiServer) => {
	const now = new Date().getTime()
	let challengesNeedUpdate = false
	
	const updatedChallenges = {
		ongoing: challenges.ongoing.map(c => {
			const time = c.endDate - now
			if (time < 0) {
				challengesNeedUpdate = true
				addNotification({
					...notifications.challengeCompleted,
					message: c.name,
				})
			}
			c.timeLeft = getTimeString(time)
			return c
		}),
		upcoming: challenges.upcoming.map(c => {
			const time = c.startDate - now
			if (time < 0) {
				challengesNeedUpdate = true
				addNotification({
					...notifications.challengeStarted,
					message: c.name,
				})
			}
			c.startsIn = getTimeString(time)
			return c
		}),
		completed: challenges.completed,
	}
	
	localStorage.setItem('challenges', JSON.stringify(updatedChallenges))
	
	return !challengesNeedUpdate ? updatedChallenges
		: updateTime(await getChallenges(apiServer), apiServer)
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

export const getChallengeTime = (progress, c) => {
	const space = '\xa0'
	progress = progress.toLowerCase()
	return (
		progress === 'upcoming' ? space + c.startsIn
			: progress === 'ongoing' ? space + c.timeLeft
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
