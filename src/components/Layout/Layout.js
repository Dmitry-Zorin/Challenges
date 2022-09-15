import { useLocation } from '@reach/router'
import SettingsContext from 'contexts/SettingsContext'
import React, { useContext, useEffect } from 'react'
import { Header, Navbar, Notifications } from './components'
import { env } from './Layout.module.scss'

const Layout = ({ children }) => {
	const { settings } = useContext(SettingsContext)
	const { pathname } = useLocation()
	
	useEffect(() => window.scrollTo(0, 0), [pathname])
	
	return (
		<div className={settings.theme}>
			<Navbar/>
			<div className={env}>
				<Notifications/>
				<div className='uk-container'>
					<Header/>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Layout
