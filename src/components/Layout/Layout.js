import React from 'react'
import ReactNotification from 'react-notifications-component'
import { Container } from 'uikit-react'
import { Header, Navbar, ScrollToTop } from './components'
import { env, layout } from './Layout.module.scss'

const Layout = ({ children, location }) => (
	<>
		<ScrollToTop {...{ location }}/>
		<Navbar {...{ location }}/>
		<ReactNotification/>
		<div className={env}>
			<Container className={layout}>
				<Header {...{ location }}/>
				{children}
			</Container>
		</div>
	</>
)

export default Layout
