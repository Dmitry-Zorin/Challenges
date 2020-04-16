import { NavigationBar } from 'components/Layout/components/Navbar/Navbar'
import React from 'react'
import ReactNotification from 'react-notifications-component'
import { Container } from 'uikit-react'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import { env, layout } from './Layout.module.scss'

export const Layout = ({ children, location }) => (
	<div>
		<ScrollToTop {...{ location }}/>
		<NavigationBar {...{ location }}/>
		<ReactNotification/>
		<div className={env}>
			<Container className={layout}>
				<Header/>
				{children}
			</Container>
		</div>
	</div>
)
