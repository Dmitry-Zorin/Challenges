const accordionItem = {
	initial: {
		height: 0,
		opacity: 0,
	},
	animate: {
		height: 'auto',
		opacity: 1,
		transition: {
			duration: 0.2,
			staggerChildren: 0.05,
		},
	},
}

export default accordionItem
