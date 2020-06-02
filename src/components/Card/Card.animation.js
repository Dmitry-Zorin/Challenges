const card = {
	initial: {
		//scale: 0.9,
	},
	animate: {
		scale: 1,
		transition: {
			type: 'spring',
			mass: 0.5,
			stiffness: 75,
			staggerChildren: 0.05,
		},
	},
}

export default card
