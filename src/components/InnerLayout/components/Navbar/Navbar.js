import AnimatedListItem from 'components/animated/AnimatedListItem'
import { navbar } from './Navbar.module.scss'
import React from 'react'
import { Navbar as UIKitNavbar } from 'uikit-react'
import SideLink from './components/SideLink'

const Navbar = ({ left, right }) => (
	<UIKitNavbar className={navbar}>
		{left && (
			<AnimatedListItem className='uk-navbar-left'>
				<SideLink to={left} side='left'/>
			</AnimatedListItem>
		)}
		{right && (
			<AnimatedListItem className='uk-navbar-right'>
				<SideLink to={right} side='right'/>
			</AnimatedListItem>
		)}
	</UIKitNavbar>
)

export default Navbar
