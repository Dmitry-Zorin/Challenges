import React from 'react'
import { env, header, layout, title } from './Layout.module.scss'
import { Container, Flex } from 'uikit-react'
import { NavigationBar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import ReactNotification from 'react-notifications-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Layout = ({ children, location }) => (
	<div>
		<ScrollToTop location={location}/>
		<NavigationBar location={location}/>
		<ReactNotification/>
		<div className={env}>
			<Container className={layout}>
				<Flex className={header}>
					<p className={title}>
						<FontAwesomeIcon
							icon='tasks'
							className='uk-visible@s'
							transform='shrink-2 down-0.4'
						/>
						Challenges
					</p>
				</Flex>
				{children}
			</Container>
		</div>
	</div>
)
