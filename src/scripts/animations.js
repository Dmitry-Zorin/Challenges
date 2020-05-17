export const getTimesArray = (numberOfItems, i) => {
	const l1 = 2 * numberOfItems + 1
	const l2 = 3 * numberOfItems
	return [0, 0.5, 1].map(e => (i + e * l1) / l2)
}