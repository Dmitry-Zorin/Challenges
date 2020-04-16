import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { header, title } from 'components/Layout/Layout.module.scss'
import React from 'react'
import { Flex } from 'uikit-react'

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