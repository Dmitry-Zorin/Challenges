export const globalData = {
	apiServer: (
			process.env.NODE_ENV === 'production' ? ''
				: window.location.href.match(/.+:/)
				+ process.env.REACT_APP_PORT
		)
		+ '/api',
}
