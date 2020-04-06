import React, { useContext } from 'react'
import { DataContext } from '../../../services/contexts/DataContext'
import {
	Container,
	Navbar,
	NavbarContainer,
	NavbarSticky,
	NavItem,
} from 'uikit-react'
import { Link } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronLeft,
	faSignInAlt,
	faSignOutAlt,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons'

export const NavigationBar = ({ location }) => {
	const context = useContext(DataContext)
	
	return (
		<NavbarSticky>
			<NavbarContainer>
				<Container style={{ width: '100%' }}>
					<Navbar>
						<NavItem>
							{location.pathname === '/' ? (
								<Link to='/' className='primary'>
									Challenges
								</Link>
							) : (
								<Link to='/'>
									<FontAwesomeIcon
										icon={faChevronLeft}
										className='icon-left'
										transform='shrink-2 down-0.65'
									/>
									Dashboard
								</Link>
							)}
						</NavItem>
						
						<NavItem className='uk-width-expand'/>
						
						<NavItem>
							{context.spinnerIsVisible ? (
								<a href='/#' onClick={e => e.preventDefault()}>
									<FontAwesomeIcon icon={faSpinner} transform='grow-10' spin/>
								</a>
							) : (
								<Link to='/login'>
									<FontAwesomeIcon
										icon={context.isAuthorized ? faSignOutAlt : faSignInAlt}
										className='icon-left'
										transform='down-0.65'
									/>
									{context.isAuthorized ? 'Log out' : 'Log in'}
								</Link>
							)}
						</NavItem>
					</Navbar>
				</Container>
			</NavbarContainer>
		</NavbarSticky>
	)
}
