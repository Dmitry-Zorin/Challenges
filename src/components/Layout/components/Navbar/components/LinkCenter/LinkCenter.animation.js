import { getTimesArray } from 'scripts/animations'

const opacity = 0.2

const circles = {
	animate: (props) => ({
		opacity: [opacity, 1, opacity],
		transition: {
			times: getTimesArray(...props),
			repeatType: 'loop',
			repeat: Infinity,
		},
	}),
}

export default circles
