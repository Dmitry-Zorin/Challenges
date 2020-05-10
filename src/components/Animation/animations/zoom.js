const zoom = {
	initial: {
		scale: 0,
	},
	animate: {
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
	},
}

export default zoom
