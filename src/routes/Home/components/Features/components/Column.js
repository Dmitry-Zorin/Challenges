import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import React from 'react'

const Column = ({ title, children, icon }) => (
	<li className='uk-margin-remove uk-padding uk-width-1-1 uk-width-expand@m'>
		<p className='uk-text-primary text-large'>
			<FontAwesomeIcon transform='shrink-5 down-0.75' {...{ icon }}/>
			{upperFirst(title)}
		</p>
		<br/>
		<p className='text-medium'>{children}</p>
	</li>
)

export default Column
