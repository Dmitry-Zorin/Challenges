import React from 'react'
import {
	Container,
	Navbar,
	NavbarContainer,
	NavbarSticky,
	NavItem,
} from 'uikit-react'
import { NavItemCenter } from './NavItemCenter'
import { NavItemLeft } from './NavItemLeft'
import { NavItemRight } from './NavItemRight'

const transform = 'shrink-3 down-0.5'

export const NavigationBar = ({ location }) => (
	<NavbarSticky>
		<NavbarContainer>
			<Container style={{ width: '100%' }}>
				<Navbar>
					<NavItem className='uk-navbar-left'>
						<NavItemLeft {...{ location, transform }}/>
					</NavItem>
					<NavItem className='uk-navbar-center'>
						<NavItemCenter/>
					</NavItem>
					<NavItem className='uk-navbar-right'>
						<NavItemRight {...{ location, transform }}/>
					</NavItem>
				</Navbar>
			</Container>
		</NavbarContainer>
	</NavbarSticky>
)
