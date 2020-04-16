import { completeReady, startReady } from 'data/notifications/challenges.json'
import { infinity, updateTimeout } from 'data/settings.json'
import { addNotification } from './notifications'

export const toMs = {
	TOO_MANY_YEARS: 6e12,
	MANY_YEARS: 3e12,
	DAY: 864e5,
	HOUR: 36e5,
	MINUTE: 6e4,
}

export const updateTime = (context, challenges = context.challenges) => {
	const { ongoing, upcoming, completed } = challenges
	const now = new Date().getTime()
	
	for (const c of ongoing) {
		const ms = c.endDate - now
		if (ms < 0 && ms >= -updateTimeout && (c.endDate - c.startDate)) {
			addNotification({ ...completeReady, message: c.name })
		}
		c.timeLeft = getTimeString(c, ms)
	}
	
	for (const c of upcoming) {
		const ms = c.startDate - now
		if (ms < 0 && ms >= -updateTimeout) {
			addNotification({ ...startReady, message: c.name })
		}
		c.startsIn = getTimeString(c, ms)
	}
	
	const updatedChallenges = { ongoing, upcoming, completed }
	localStorage.setItem('challenges', JSON.stringify(updatedChallenges))
	
	return updatedChallenges
}

const getTimeString = (c, ms) => {
	if (ms > toMs.MANY_YEARS) return infinity
	const { days, hours, minutes } = getTimeObj(ms)
	const timeStrings = [days + 'd', hours + 'h', minutes + 'm']
	return timeStrings.filter(e => +e[0]).join(' ')
}

export const getTimeObj = (ms) => {
	const { DAY, HOUR, MINUTE } = toMs
	return {
		days: ms / DAY | 0,
		hours: ms % DAY / HOUR | 0,
		minutes: Math.ceil(ms % HOUR / MINUTE),
	}
}

export const getChallengeTime = ({ startsIn, timeLeft }) => {
	const time = startsIn || timeLeft
	return time && (time === infinity ? '' : '\xa0') + time
}
