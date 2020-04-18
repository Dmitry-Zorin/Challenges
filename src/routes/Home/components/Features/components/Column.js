import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import React from 'react'
import { Margin } from 'uikit-react'

const Column = ({ title, children, icon }) => (
	<Margin
		type='remove-top'
		className='uk-padding uk-width-1-1 uk-width-expand@m'
	>
		<p className='font-size-large uk-text-primary'>
			<FontAwesomeIcon transform='shrink-3' {...{ icon }}/>
			{upperFirst(title)}
		</p>
		<br/>
		<p className='font-size-medium uk-text-light'>{children}</p>
	</Margin>
)

export default Column
