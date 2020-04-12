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
	faBars,
	faChevronLeft,
	faPlus,
	faSignInAlt,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

const transform = 'shrink-3 down-0.5'

export const NavigationBar = ({ location }) => {
	const { userInfo, spinnerIsVisible } = useContext(DataContext)
	const text = 'Challenges'
	return (
		<NavbarSticky>
			<NavbarContainer>
				<Container style={{ width: '100%' }}>
					<Navbar>
						<NavItem>
							{location.pathname === '/' ? (
								<Link to='/' className='primary'>
									<div className='uk-hidden@m' data-uk-toggle='target: #info'>
										<FontAwesomeIcon
											icon={faBars}
											className='icon-left'
											transform={transform}
										/>
										{text}
									</div>
									<div className='uk-visible@m'>{text}</div>
								</Link>
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
							{spinnerIsVisible ? (
								<a href='/#' onClick={e => e.preventDefault()}>
									<div data-uk-spinner='ratio: 0.8'/>
								</a>
							) : location.pathname.match(/\/($|create|edit)/) ? (
								<Link to='/login'>
									<FontAwesomeIcon
										icon={
											userInfo?.username ? faSignOutAlt : faSignInAlt
										}
										className='icon-left'
										transform={transform}
									/>
									{userInfo?.username ? 'log out' : 'log in'}
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
