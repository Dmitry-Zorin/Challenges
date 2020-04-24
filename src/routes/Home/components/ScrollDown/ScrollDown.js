import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Flex } from 'uikit-react'
import { container } from './ScrollDown.module.scss'

const ScrollDown = ({ target }) => (
	<>
		<br className='uk-hidden@m'/>
		<a href={target} className='uk-visible@m' data-uk-scroll='offset: 80'>
			<Flex className={container}>
				<p className='text-medium uk-text-center uk-text-light'>
					Scroll down
					<br/>
					<FontAwesomeIcon transform='shrink-1 up-3' icon='chevron-down'/>
				</p>
			</Flex>
		</a>
	</>
)

export default ScrollDown
