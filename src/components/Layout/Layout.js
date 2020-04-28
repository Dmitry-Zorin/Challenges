import React, { useEffect } from 'react'
import { Header, Navbar, Notifications } from './components'
import { env, layout } from './Layout.module.scss'

const Layout = ({ children, location }) => {
	useEffect(
		() => window.scrollTo(0, 0),
		[location.pathname],
	)
	return (
		<>
			<Navbar {...{ location }}/>
			<div className={env}>
				<Notifications/>
				<div className={'uk-container ' + layout}>
					<Header {...{ location }}/>
					{children}
				</div>
			</div>
		</>
	)
}

export default Layout
