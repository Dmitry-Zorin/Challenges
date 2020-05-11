const getOpacityArray = (arrowsArray, i) => {
	let opacityArray = arrowsArray.map(i => i / arrowsArray.length)
	opacityArray = [...opacityArray, 1, ...opacityArray.reverse()]
	
	const zeros = Array(arrowsArray.length - 1).fill(0)
	return [...zeros.slice(0, i), ...opacityArray, ...zeros.slice(i)]
}

const arrows = {
	animate: (props) => ({
		y: ['-0.9em', '-0.7em'],
		scale: [1, 1.25],
		opacity: getOpacityArray(...props),
		transition: {
			duration: 2,
			loop: Infinity,
			repeatDelay: 0.25,
		},
	}),
}

export default arrows
