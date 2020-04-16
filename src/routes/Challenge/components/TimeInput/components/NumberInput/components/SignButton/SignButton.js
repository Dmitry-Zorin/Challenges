import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { leftButton, rightButton } from './SignButton.module.scss'

export const SignButton = ({ sign, icon, timeToMs, ms, setState, step = 1 }) => (
	<button
		type='button'
		className={`
			${sign < 0 ? leftButton : rightButton}
			uk-button
			uk-button-default
			uk-padding-remove
		`}
		onClick={() => setState(Math.max(0, ms + sign * step * timeToMs))}
	>
		<FontAwesomeIcon className='uk-margin-auto' {...{ icon }}/>
	</button>
)
