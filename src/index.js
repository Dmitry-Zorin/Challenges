import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import 'scripts/icons'
import * as serviceWorker from 'scripts/serviceWorker'
import 'styles/global.scss'
import 'styles/uikit/theme.scss'
import '../node_modules/animate.css/animate.min.css'
import '../node_modules/react-notifications-component/dist/theme.css'
import '../node_modules/uikit/dist/js/uikit.min.js'
import App from './App' // import App after styles

ReactDOM.render(
	<StrictMode>
		<App/>
	</StrictMode>,
	document.getElementById('root'),
)

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
