import React from 'react'
import { LinkCenter, LinkLeft, LinkRight, NavItem } from './components'

const Navbar = () => (
	<div data-uk-sticky>
		<nav className='uk-navbar-container' data-uk-navbar>
			<div className='uk-container uk-flex-1'>
				<div className='uk-navbar'>
					<div className='uk-navbar-left'>
						<ul className='uk-navbar-nav'>
							<NavItem>
								<LinkLeft/>
							</NavItem>
						</ul>
					</div>
					<div className='uk-navbar-center'>
						<ul className='uk-navbar-nav'>
							<NavItem>
								<LinkCenter/>
							</NavItem>
						</ul>
					</div>
					<div className='uk-navbar-right'>
						<ul className='uk-navbar-nav'>
							<NavItem>
								<LinkRight/>
							</NavItem>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	</div>
)

export default Navbar
