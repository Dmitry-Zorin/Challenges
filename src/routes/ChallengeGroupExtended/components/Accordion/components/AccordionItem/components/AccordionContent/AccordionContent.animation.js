const accordionContent = {
	initial: {
		height: 0,
		opacity: 0,
		transition: {
			ease: 'easeOut',
		},
	},
	animate: {
		height: 'auto',
		opacity: 1,
		transition: {
			ease: 'easeOut',
			staggerChildren: 0.075,
		},
	},
}

export default accordionContent
