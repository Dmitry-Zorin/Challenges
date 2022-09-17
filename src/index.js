import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'scripts/icons'
import 'styles/global.scss'
import 'styles/uikit/theme.scss'
import '../node_modules/uikit/dist/js/uikit.min.js'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
)
