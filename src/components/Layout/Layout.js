import React from 'react'
import styles from './Layout.module.scss'
import { Container } from 'uikit-react'
import { NavigationBar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import ReactNotification from 'react-notifications-component'

export const Layout = ({ children, location }) => (
	<div>
		<ScrollToTop location={location}/>
		<NavigationBar location={location}/>
		<ReactNotification style={{ paddingTop: 'env(safe-area-inset-top)' }}/>
		<Container className={styles.layout}>
			<div className={styles.header + ' uk-text-center'}>
				<p className={styles.title}>
					Challenges
				</p>
			</div>
			{children}
		</Container>
	</div>
)
