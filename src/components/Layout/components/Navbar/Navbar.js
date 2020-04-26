import AnimatedListItem from 'components/animated/AnimatedListItem'
import React from 'react'
import {
	Container,
	Navbar as UIKitNavbar,
	NavbarContainer,
	NavbarSticky,
} from 'uikit-react'
import { NavItemCenter, NavItemLeft, NavItemRight } from './components'

const Navbar = ({ location }) => (
	<NavbarSticky>
		<NavbarContainer>
			<Container className='uk-padding-remove' style={{ width: '100%' }}>
				<UIKitNavbar>
					<AnimatedListItem className='uk-navbar-left'>
						<NavItemLeft {...{ location }}/>
					</AnimatedListItem>
					<AnimatedListItem className='uk-navbar-center'>
						<NavItemCenter/>
					</AnimatedListItem>
					<AnimatedListItem className='uk-navbar-right'>
						<NavItemRight {...{ location }}/>
					</AnimatedListItem>
				</UIKitNavbar>
			</Container>
		</NavbarContainer>
	</NavbarSticky>
)

export default Navbar
