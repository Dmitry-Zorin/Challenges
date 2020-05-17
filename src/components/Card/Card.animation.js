const card = {
	initial: {
		scale: 0.9,
	},
	animate: {
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
			staggerChildren: 0.05,
		},
	},
}

export default card
