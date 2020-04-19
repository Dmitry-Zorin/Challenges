import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import React from 'react'
import { Flex } from 'uikit-react'

const text = 'Challenges'

const NavItemLeft = ({ location, transform }) => (
	<Link to='/'>
		{location.pathname === '/' ? (
			<div className='uk-height-1-1'>
				<div
					className='uk-hidden@m uk-flex uk-height-1-1'
					data-uk-toggle='target: #info'
				>
					<p>
						<FontAwesomeIcon icon='bars' transform={transform}/>
						{text}
					</p>
				</div>
				<Flex className='uk-visible@m uk-height-1-1'>
					<p>{text}</p>
				</Flex>
			</div>
		) : (
			<div>
				<FontAwesomeIcon icon='chevron-left' transform={transform}/>
				Dashboard
			</div>
		)}
	</Link>
)

export default NavItemLeft
