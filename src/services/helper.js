import axios from 'axios'
import { store } from 'react-notifications-component'
import { notifications } from './data/notifications'

export const toMs = {
	DAY: 864e5,
	HOUR: 36e5,
	MINUTE: 6e4,
}

export const getChallenges = apiServer => (
	axios.post(apiServer,
		{ query: '{ challenges { _id name difficulty progress startDate endDate } }' },
		{ withCredentials: true },
	)
		.then(res => {
			const challenges = sortChallenges(res.data.data.challenges)
			localStorage.setItem('challenges', JSON.stringify(challenges))
			return updateTime(challenges, apiServer)
		})
		.catch(err => {
			handleError(err, 'Failed to get challenges')
			return {}
		})
)

const sortChallenges = challenges => ({
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

export const updateTime = async (state, apiServer) => {
	const now = new Date().getTime()
	let needsUpdate = false

	const updatedState = {
		...{
			ongoing: state.ongoing?.map(c => {
				const time = c.endDate - now
				if (time < 0) {
					needsUpdate = true
					addNotification({
						title: 'Challenge completed!',
						message: c.name,
						type: 'success',
					})
				}
				c.timeLeft = getTimeString(time)
				return c
			}),
		},
		...{
			upcoming: state.upcoming?.map(c => {
				const time = c.startDate - now
				if (time < 0) {
					needsUpdate = true
					addNotification({
						title: 'Challenge started!',
						message: c.name,
					})
				}
				c.startsIn = getTimeString(time)
				return c
			}),
		},
		...{
			completed: state.completed,
		},
	}

	return needsUpdate
		? getChallenges(apiServer)
		: updatedState
}

const getTimeString = ms => {
	const time = getTimeObj(ms)
	return [
		time.days ? time.days + 'd' : '',
		time.hours ? time.hours + 'h' : '',
		time.minutes ? time.minutes + 'm' : '',
	].join(' ')
}

export const getTimeObj = ms => ({
	days: ms / toMs.DAY | 0,
	hours: ms % toMs.DAY / toMs.HOUR | 0,
	minutes: Math.ceil(ms % toMs.HOUR / toMs.MINUTE),
})

export const getChallengeTime = c => (
	c.progress === 'Upcoming' ? c.startsIn
		: c.progress === 'Ongoing' ? c.timeLeft
		: ''
)

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
