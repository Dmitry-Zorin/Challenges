import 'scripts/icons'
import 'styles/global.scss'
import 'styles/uikit/theme.scss'
import '../node_modules/react-notifications-component/dist/theme.css'
import '../node_modules/animate.css/animate.min.css'
import '../node_modules/uikit/dist/js/uikit.min.js'

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { App } from 'components/App'
import * as serviceWorker from 'scripts/serviceWorker'

ReactDOM.render(
	<StrictMode>
		<App/>
	</StrictMode>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
