import React from 'react'
import styles from './Layout.module.scss'
import { Container } from 'uikit-react'
import { NavigationBar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import ReactNotification from 'react-notifications-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Layout = ({ children, location }) => (
	<div>
		<ScrollToTop location={location}/>
		<NavigationBar location={location}/>
		<ReactNotification/>
		<div className={styles.env}>
			<Container className={styles.layout}>
				<div className={styles.header + ' uk-text-center'}>
					<p className={styles.title}>
						<FontAwesomeIcon
							icon='tasks'
							className={styles.icon + ' icon-left'}
							transform='shrink-2 down-0.4'
						/>
						Challenges
					</p>
				</div>
				{children}
			</Container>
		</div>
	</div>
)
