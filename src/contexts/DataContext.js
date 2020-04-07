import { createContext } from 'react'

const server = process.env.NODE_ENV === 'production' ? ''
	: `http://${window.location.hostname}:${process.env.REACT_APP_API_PORT}`

const apiServer = server + '/api'

export const DataContext = createContext({ apiServer })
