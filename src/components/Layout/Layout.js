import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header, Navbar, Notifications } from './components'
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
	const { pathname } = useLocation()

	useEffect(() => window.scrollTo(0, 0), [pathname])

	return (
		<div style={{ paddingBottom: '4rem' }}>
			<Navbar />
			<div className={styles.env}>
				<Notifications />
				<div className="uk-container">
					<Header />
					{children}
				</div>
			</div>
		</div>
	)
}

export default Layout
