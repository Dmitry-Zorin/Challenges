import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Flex } from 'uikit-react'
import { container } from './ScrollDown.module.scss'

const ScrollDown = ({ target }) => (
	<Flex className={container}>
		<a
			href={`#${target}`}
			className='font-size-medium uk-text-light uk-visible@m'
			data-uk-scroll='offset: 100'
		>
			Scroll down
			<br/>
			<FontAwesomeIcon icon='chevron-down'/>
		</a>
	</Flex>
)

export default ScrollDown
