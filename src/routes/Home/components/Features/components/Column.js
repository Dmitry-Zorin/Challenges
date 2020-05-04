import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import React from 'react'

const Column = ({ title, children, icon }) => (
	<li className='uk-flex uk-width-1-1 uk-width-expand@m'>
		<div className='uk-padding'>
			<p className='uk-text-primary text-large'>
				<FontAwesomeIcon {...{ icon }}/>
				{upperFirst(title)}
			</p>
			<p className='text-medium'>{children}</p>
		</div>
	</li>
)

export default Column
