import AnimatedButton from 'components/animated/AnimatedButton'
import DataContext from 'contexts/DataContext'
import React, { useContext, useEffect } from 'react'
import { addNotification } from 'scripts/notification'
import { Header, Navbar, Notifications } from './components'
import { env, layout } from './Layout.module.scss'

const Layout = ({ children, location }) => {
	useEffect(
		() => window.scrollTo(0, 0),
		[location.pathname],
	)
	const context = useContext(DataContext)
	return (
		<>
			<Navbar {...{ location }}/>
			{/*
			<AnimatedButton
				className='uk-width-1-1'
				style={{ height: 50 }}
				onClick={() => {
					addNotification(context, {
						title: 'Notification',
						message: 'Click!',
					})
				}}
			>
				Notify!
			</AnimatedButton>
			*/}
			<div className={env}>
				<Notifications/>
				<div className={`uk-container ${layout}`}>
					<Header {...{ location }}/>
					{children}
				</div>
			</div>
		</>
	)
}

export default Layout
