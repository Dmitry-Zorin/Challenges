import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'scripts/icons'
import * as serviceWorker from 'scripts/serviceWorker'
import 'styles/global.scss'
import 'styles/uikit/theme.scss'
import '../node_modules/uikit/dist/js/uikit.min.js'
import App from './App' // import App after styles

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
)

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
