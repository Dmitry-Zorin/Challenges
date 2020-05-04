import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { container } from './ScrollDown.module.scss'

const ScrollDown = ({ target }) => (
	<>
		<br className='uk-hidden@m'/>
		<a href={target} className='uk-visible@m' data-uk-scroll='offset: 80'>
			<div className={`${container} uk-flex`}>
				<div className='uk-text-center'>
					<p className='text-medium uk-text-light'>
						Scroll down
						<br/>
						<FontAwesomeIcon icon='chevron-down'/>
					</p>
				</div>
			</div>
		</a>
	</>
)

export default ScrollDown
