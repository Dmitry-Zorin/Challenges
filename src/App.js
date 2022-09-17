import { Layout, Routes } from 'components'
import {
	NotificationProvider,
	RequestProvider,
	SpinnerProvider,
	UserProvider,
} from 'contexts'
import { BrowserRouter } from 'react-router-dom'

const App = () => (
	<BrowserRouter>
		<NotificationProvider>
			<SpinnerProvider>
				<RequestProvider>
					<UserProvider>
						<Layout>
							<Routes />
						</Layout>
					</UserProvider>
				</RequestProvider>
			</SpinnerProvider>
		</NotificationProvider>
	</BrowserRouter>
)

export default App
