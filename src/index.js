import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/uikit/dist/js/uikit.min.js'
import './index.scss'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import ReactNotification from 'react-notifications-component'

ReactDOM.render(
	<StrictMode>
		<ReactNotification/>
		<App/>
	</StrictMode>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
