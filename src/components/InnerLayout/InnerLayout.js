import AnimatedCard from 'components/Animated/AnimatedCard/AnimatedCard'
import React from 'react'
import { Margin, Navbar, NavItem } from 'uikit-react'
import { SideLink } from './components'
import { card, navbar } from './InnerLayout.module.scss'

const InnerLayout = ({ children, left, right }) => (
	<AnimatedCard className={`${card} ${left ? 'uk-padding-remove-top' : ''}`}>
		<Margin
			type='top; bottom'
			className='uk-align-center'
			style={{ maxWidth: '800px' }}
		>
			<Navbar className={navbar}>
				{left && (
					<NavItem className='uk-navbar-left'>
						<SideLink to={left} side='left'/>
					</NavItem>
				)}
				{right && (
					<NavItem className='uk-navbar-right'>
						<SideLink to={right} side='right'/>
					</NavItem>
				)}
			</Navbar>
			<Margin type='remove'>
				{children}
			</Margin>
		</Margin>
	</AnimatedCard>
)

export default InnerLayout
