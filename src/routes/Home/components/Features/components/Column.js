import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import React from 'react'
import { Margin } from 'uikit-react'

const Column = ({ title, children, icon }) => (
	<Margin
		type='remove'
		className='uk-padding uk-text-center uk-width-1-1 uk-width-expand@m'
	>
		<p className='uk-text-primary text-large'>
			<FontAwesomeIcon transform='shrink-5 down-1' {...{ icon }}/>
			{upperFirst(title)}
		</p>
		<br/>
		<p className='text-medium uk-text-light'>
			{children}
		</p>
	</Margin>
)

export default Column
