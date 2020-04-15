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
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const transform = 'shrink-3 down-0.5'

export const NavigationBar = ({ location }) => {
	const { userInfo, spinnerIsVisible } = useContext(DataContext)
	const text = 'Challenges'
	const inOrOut = userInfo?.username ? 'out' : 'in'
	
	return (
		<NavbarSticky>
			<NavbarContainer>
				<Container style={{ width: '100%' }}>
					<Navbar>
						<NavItem className='uk-navbar-left'>
							{location.pathname === '/' ? (
								<Link to='/'>
									<div className='uk-hidden@m' data-uk-toggle='target: #info'>
										<FontAwesomeIcon icon='bars' transform={transform}/>
										{text}
									</div>
									<div className='uk-visible@m'>{text}</div>
								</Link>
							) : (
								<Link to='/'>
									<FontAwesomeIcon icon='chevron-left' transform={transform}/>
									Dashboard
								</Link>
							)}
						</NavItem>
						
						<NavItem className='uk-navbar-center'>
							{spinnerIsVisible && (
								<a href='/#' onClick={e => e.preventDefault()}>
									<FontAwesomeIcon icon={faSpinner} transform='grow-10' spin/>
								</a>
							)}
						</NavItem>
						
						<NavItem className='uk-navbar-right'>
							{userInfo === undefined ? null
								: location.pathname.match(/\/($|create|edit)/) ? (
									<Link to='/login'>
										<FontAwesomeIcon
											icon={`sign-${inOrOut}-alt`}
											transform={transform}
										/>
										{`log ${inOrOut}`}
									</Link>
								) : (
									<Link to='/create'>
										<FontAwesomeIcon icon='plus' transform={transform}/>
										Create
									</Link>
								)
							}
						</NavItem>
					</Navbar>
				</Container>
			</NavbarContainer>
		</NavbarSticky>
	)
}
