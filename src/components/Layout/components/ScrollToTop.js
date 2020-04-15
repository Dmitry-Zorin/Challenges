import { useEffect } from 'react'

export const ScrollToTop = ({ location }) => {
	useEffect(
		() => window.scrollTo(0, 0),
		[location.pathname],
	)
	return null
}
