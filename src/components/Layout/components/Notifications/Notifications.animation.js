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
			type: 'spring',
			stiffness: 150,
			damping: 15,
		},
	},
}

notification.exit = {
	...notification.initial,
	transition: {
		duration: 0.25,
	},
}

export default notification
