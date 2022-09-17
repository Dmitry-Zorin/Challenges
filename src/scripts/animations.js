export const slowSpringConfig = {
	type: 'spring',
	stiffness: 60,
	damping: 14,
	mass: 0.9,
}

export const gentleSpringConfig = {
	type: 'spring',
	stiffness: 120,
	damping: 14,
	mass: 0.45,
}

export const stiffSpringConfig = {
	type: 'spring',
	stiffness: 180,
	damping: 14,
	mass: 0.35,
}

export function getSpringAnimation(open) {
	return open ? gentleSpringConfig : stiffSpringConfig
}

export const getTimesArray = (numberOfItems, i) => {
	const l1 = 2 * numberOfItems + 1
	const l2 = 3 * numberOfItems
	return [0, 0.5, 1].map((e) => (i + e * l1) / l2)
}
