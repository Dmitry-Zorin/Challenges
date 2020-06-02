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
		transition: {
			type: 'spring',
			mass: 0.5,
		},
	},
	exit: {
		opacity: 0,
		scale: 1.1,
		y: 4,
		transition: {
			ease: 'easeOut',
		},
	},
}

export default notification
