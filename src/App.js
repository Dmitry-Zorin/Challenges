import { LocationProvider } from '@reach/router'
import { Layout, Routes } from 'components'
import {
	NotificationProvider,
	RequestProvider,
	SettingsProvider,
	SpinnerProvider,
	UserProvider,
} from 'contexts'
import React from 'react'

const App = () => (
	<NotificationProvider>
		<SpinnerProvider>
			<RequestProvider>
				<UserProvider>
					<SettingsProvider>
						<LocationProvider>
							<Layout>
								<Routes/>
							</Layout>
						</LocationProvider>
					</SettingsProvider>
				</UserProvider>
			</RequestProvider>
		</SpinnerProvider>
	</NotificationProvider>
)

export default App
