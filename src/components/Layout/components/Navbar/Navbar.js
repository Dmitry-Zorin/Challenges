import React from 'react'
import {
	Container,
	Navbar,
	NavbarContainer,
	NavbarSticky,
	NavItem,
} from 'uikit-react'
import { NavItemCenter, NavItemLeft, NavItemRight } from './components'

const NavigationBar = ({ location }) => (
	<NavbarSticky>
		<NavbarContainer>
			<Container style={{ width: '100%' }}>
				<Navbar>
					<NavItem className='uk-navbar-left'>
						<NavItemLeft {...{ location }}/>
					</NavItem>
					<NavItem className='uk-navbar-center'>
						<NavItemCenter/>
					</NavItem>
					<NavItem className='uk-navbar-right'>
						<NavItemRight {...{ location }}/>
					</NavItem>
				</Navbar>
			</Container>
		</NavbarContainer>
	</NavbarSticky>
)

export default NavigationBar
