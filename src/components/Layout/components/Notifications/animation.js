export const transition = {
	duration: 0.4
}

const notification = {
	initial: {
		opacity: 0,
		scale: 0.25,
		y: -30,
	},
	animate: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			...transition,
			type: 'spring',
			stiffness: 150,
			damping: 15,
		}
	},
}

notification.exit = {
	...notification.initial,
	transition
}

export default notification
