import { gentleSpringConfig, stiffSpringConfig } from 'scripts/animations'

const notification = {
	initial: {
		opacity: 0,
		scale: 0.5,
		y: -20,
	},
	animate: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: gentleSpringConfig,
	},
	exit: {
		opacity: 0,
		scale: 1.1,
		y: 4,
		transition: stiffSpringConfig,
	},
}

export default notification
