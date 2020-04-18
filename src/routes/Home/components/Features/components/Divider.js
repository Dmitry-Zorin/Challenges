import React from 'react'
import { Margin } from 'uikit-react'

const Divider = () => (
	<>
		<Margin type='remove' className='uk-padding uk-padding-remove-horizontal'>
			<hr className='uk-divider-vertical uk-height-1-1 uk-visible@m'/>
		</Margin>
		<hr className='uk-width-expand uk-hidden@m'/>
	</>
)

export default Divider
