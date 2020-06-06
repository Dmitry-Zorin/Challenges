import { getTimesArray } from 'scripts/animations'

const opacity = 0.2

const circles = {
	animate: (props) => ({
		opacity: [opacity, 1, opacity],
		transition: {
			times: getTimesArray(...props),
			loop: Infinity,
		},
	}),
}

export default circles