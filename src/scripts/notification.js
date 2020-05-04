export const addNotification = (context, info) => {
	context.addNotification({
		id: new Date().getTime(),
		icon: `${info.type === 'danger' ? 'exclamation' : 'info'}-circle`,
		...info,
	})
}
