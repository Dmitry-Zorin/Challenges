import React from 'react'
import { env, layout, header, title, icon } from './Layout.module.scss'
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
		<div className={env}>
			<Container className={layout}>
				<div className={header + ' uk-text-center'}>
					<p className={title}>
						<FontAwesomeIcon
							icon='tasks'
							className={icon + ' icon-left'}
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
