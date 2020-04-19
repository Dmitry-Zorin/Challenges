import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import React from 'react'
import { Margin } from 'uikit-react'

const Column = ({ title, children, icon }) => (
	<Margin
		type='remove'
		className='uk-padding uk-text-center uk-width-1-1 uk-width-expand@m'
	>
		<p className='font-size-large uk-text-primary uk-margin-remove'>
			<FontAwesomeIcon transform='shrink-3' {...{ icon }}/>
			{upperFirst(title)}
		</p>
		<br/>
		<p className='font-size-medium uk-text-light uk-margin-remove'>
			{children}
		</p>
	</Margin>
)

export default Column
