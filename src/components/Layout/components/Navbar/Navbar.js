import AnimatedListItem from 'components/animated/AnimatedListItem'
import React from 'react'
import { NavItemCenter, NavItemLeft, NavItemRight } from './components'

const Navbar = ({ location }) => (
	<div data-uk-sticky>
		<nav className='uk-navbar-container' data-uk-navbar>
			<div className='uk-container uk-flex-1'>
				<div className='uk-navbar'>
					<div className='uk-navbar-left'>
						<ul className='uk-navbar-nav'>
							<AnimatedListItem>
								<NavItemLeft {...{ location }}/>
							</AnimatedListItem>
						</ul>
					</div>
					<div className='uk-navbar-center'>
						<ul className='uk-navbar-nav'>
							<AnimatedListItem>
								<NavItemCenter/>
							</AnimatedListItem>
						</ul>
					</div>
					<div className='uk-navbar-right'>
						<ul className='uk-navbar-nav'>
							<AnimatedListItem>
								<NavItemRight {...{ location }}/>
							</AnimatedListItem>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	</div>
)

export default Navbar
