import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { container } from './ScrollDown.module.scss'

const ScrollDown = ({ target }) => (
	<>
		<br className='uk-hidden@m'/>
		<a href={target} className='uk-visible@m' data-uk-scroll='offset: 80'>
			<div className={`${container} uk-flex`}>
				<div
					className='uk-text-center uk-text-light'
					style={{ lineHeight: 1.1 }}
				>
					<p className='text-medium'>Scroll down</p>
					<FontAwesomeIcon icon='chevron-down' transform='shrink-2 down-3'/>
				</div>
			</div>
		</a>
	</>
)

export default ScrollDown
