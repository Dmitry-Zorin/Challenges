import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Flex } from 'uikit-react'
import { header, title } from './Header.module.scss'

export const Header = () => (
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
)