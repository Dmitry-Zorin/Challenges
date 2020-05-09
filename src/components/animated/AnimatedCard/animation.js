const card = {
	initial: {
		scale: 0.925,
	},
	animate: {
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 260,
			damping: 20,
			staggerChildren: 0.05,
		},
	},
}

export default card
