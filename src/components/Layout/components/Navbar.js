import React, { useContext } from 'react'
import { DataContext } from 'contexts/DataContext'
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
	faPlus,
	faSignInAlt,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

const transform = 'shrink-3 down-0.5'

export const NavigationBar = ({ location }) => {
	const context = useContext(DataContext)
	
	return (
		<NavbarSticky>
			<NavbarContainer>
				<Container style={{ width: '100%' }}>
					<Navbar>
						<NavItem>
							{location.pathname === '/' ? (
								<Link to='/' className='primary'>Challenges</Link>
							) : (
								<Link to='/'>
									<FontAwesomeIcon
										icon={faChevronLeft}
										className='icon-left'
										transform={transform}
									/>
									Dashboard
								</Link>
							)}
						</NavItem>
						
						<NavItem className='uk-width-expand'/>
						
						<NavItem>
							{context.spinnerIsVisible ? (
								<a href='/#' onClick={e => e.preventDefault()}>
									<div data-uk-spinner='ratio: 0.8'/>
								</a>
							) : location.pathname.match(/\/($|create|edit)/) ? (
								<Link to='/login'>
									<FontAwesomeIcon
										icon={context.userIsAuthorized ? faSignOutAlt : faSignInAlt}
										className='icon-left'
										transform={transform}
									/>
									{context.userIsAuthorized ? 'log out' : 'log in'}
								</Link>
							) : (
								<Link to='/create'>
									<FontAwesomeIcon
										icon={faPlus}
										className='icon-left'
										transform={transform}
									/>
									Create
								</Link>
							)}
						</NavItem>
					</Navbar>
				</Container>
			</NavbarContainer>
		</NavbarSticky>
	)
}
