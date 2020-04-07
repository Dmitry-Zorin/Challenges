import { getChallenges } from './services'
import { addNotification } from './utils'
import challenge from 'data/notifications/challenge'

export const toMs = { DAY: 864e5, HOUR: 36e5, MINUTE: 6e4 }

export const updateTime = async (challenges, context) => {
	const now = new Date().getTime()
	let challengesNeedUpdate = false
	
	const getTime = (c, ms, notification) => {
		if (ms < 0) {
			challengesNeedUpdate = true
			addNotification({ ...notification, message: c.name })
		}
		return getTimeString(c, ms)
	}
	
	const updatedChallenges = {
		ongoing: challenges.ongoing.map(c => {
			const ms = c.endDate - now
			c.timeLeft = getTime(c, ms, challenge.completed)
			return c
		}),
		upcoming: challenges.upcoming.map(c => {
			const ms = c.startDate - now
			c.startsIn = getTime(c, ms, challenge.started)
			return c
		}),
		completed: challenges.completed,
	}
	
	localStorage.setItem('challenges', JSON.stringify(updatedChallenges))
	
	return !challengesNeedUpdate ? updatedChallenges
		: updateTime(await getChallenges(context), context)
}

const getTimeString = (c, ms) => {
	const time = getTimeObj(ms)
	const timeStrings = [time.days + 'd', time.hours + 'h', time.minutes + 'm']
	return timeStrings.filter(e => +e[0]).join(' ')
}

export const getTimeObj = (ms) => ({
	days: ms / toMs.DAY | 0,
	hours: ms % toMs.DAY / toMs.HOUR | 0,
	minutes: Math.ceil(ms % toMs.HOUR / toMs.MINUTE),
})

export const getChallengeTime = (c) => {
	const time = c.startsIn || c.timeLeft || ''
	return time && '\xa0' + time
}
