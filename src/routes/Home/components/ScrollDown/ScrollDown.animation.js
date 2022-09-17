import { getTimesArray } from 'scripts/animations'

const opacity = 0

const arrows = {
	animate: (props) => ({
		opacity: [opacity, 1, opacity],
		scale: [0.8, 0.9, 1],
		y: ['-0.9em', '-0.8em', '-0.7em'],
		transition: {
			times: getTimesArray(...props),
			duration: 3,
			repeatType: 'loop',
			repeat: Infinity,
		},
	}),
}

export default arrows
