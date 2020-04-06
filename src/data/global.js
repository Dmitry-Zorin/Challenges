const server = process.env.NODE_ENV === 'production' ? ''
	: `http://${window.location.hostname}:${process.env.REACT_APP_API_PORT}`

export const globalData = {
	apiServer: server + '/api',
}
