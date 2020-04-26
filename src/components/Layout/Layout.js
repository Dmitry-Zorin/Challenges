import React, { useEffect } from 'react'
import ReactNotification from 'react-notifications-component'
import { Container } from 'uikit-react'
import { Header, Navbar } from './components'
import { env, layout } from './Layout.module.scss'

const Layout = ({ children, location }) => {
	useEffect(
		() => window.scrollTo(0, 0),
		[location.pathname],
	)
	return (
		<>
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
}

export default Layout
