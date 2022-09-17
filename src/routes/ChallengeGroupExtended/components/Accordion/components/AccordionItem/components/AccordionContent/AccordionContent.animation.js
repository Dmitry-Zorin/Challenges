import { gentleSpringConfig, stiffSpringConfig } from 'scripts/animations'

const accordionContent = {
	initial: {
		height: 0,
		opacity: 0,
		transition: stiffSpringConfig,
	},
	animate: {
		height: 'auto',
		opacity: 1,
		transition: {
			staggerChildren: 0.075,
			...gentleSpringConfig,
		},
	},
}

export default accordionContent
