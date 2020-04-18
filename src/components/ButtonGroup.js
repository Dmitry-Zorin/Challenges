import React from 'react'
import { Flex } from 'uikit-react'

const ButtonGroup = ({ children }) => (
	<Flex className='uk-flex-center uk-grid-small' style={{ marginTop: '3.5em' }}>
		{children}
	</Flex>
)

export default ButtonGroup
