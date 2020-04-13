const getUserInfo = (user) => {
	const { challenges } = user
	challenges.ongoing.sort((a, b) => a.endDate - b.endDate)
	challenges.upcoming.sort((a, b) => a.startDate - b.startDate)
	challenges.completed.sort((a, b) => b.endDate - a.endDate)
	return user
}

module.exports = getUserInfo
