import { gentleSpringConfig } from 'scripts/animations'

const zoom = {
	initial: {
		scale: 0,
	},
	animate: {
		scale: 1,
		transition: gentleSpringConfig,
	},
}

export default zoom
