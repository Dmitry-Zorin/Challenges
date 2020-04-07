const getUserInfo = (user) => {
	if (!user) return null
	
	const sortedChallenges = {
		ongoing: [],
		upcoming: [],
		completed: [],
	}
	const now = new Date().getTime()
	
	for (const c of user.challenges) {
		const progress = (
			now < c.startDate ? 'upcoming'
				: now < c.endDate ? 'ongoing'
				: 'completed'
		)
		sortedChallenges[progress].push(c)
	}
	
	sortedChallenges.ongoing.sort((a, b) => a.endDate - b.endDate)
	sortedChallenges.upcoming.sort((a, b) => a.startDate - b.startDate)
	sortedChallenges.completed.sort((a, b) => b.endDate - a.endDate)
	
	return {
		username: user.username,
		password: user.password,
		challenges: sortedChallenges,
	}
}

module.exports = getUserInfo
