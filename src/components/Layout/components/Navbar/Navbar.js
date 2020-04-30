import AnimatedListItem from 'components/animated/AnimatedListItem'
import React from 'react'
import { NavItemCenter, NavItemLeft, NavItemRight } from './components'

const Navbar = ({ location }) => (
	<div className='uk-navbar-container' data-uk-sticky>
		<div className='uk-container'>
			<div className='uk-navbar-nav uk-flex uk-flex-between'>
				<AnimatedListItem className='uk-margin-remove'>
					<NavItemLeft {...{ location }}/>
				</AnimatedListItem>
				<AnimatedListItem className='uk-margin-remove'>
					<NavItemCenter/>
				</AnimatedListItem>
				<AnimatedListItem className='uk-margin-remove'>
					<NavItemRight {...{ location }}/>
				</AnimatedListItem>
			</div>
		</div>
	</div>
)

export default Navbar
