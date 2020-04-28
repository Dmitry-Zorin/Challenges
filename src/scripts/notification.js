export const addNotification = (context, info) => {
	context.updateNotifications([
		...context.notifications,
		{
			id: new Date().getTime(),
			icon: `${info.type === 'danger' ? 'exclamation' : 'info'}-circle`,
			...info,
		},
	])
}
