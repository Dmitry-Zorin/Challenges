import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
	leftButton,
	rightButton,
} from 'routes/Challenge/components/TimeInput/TimeInput.module.scss'

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
		<FontAwesomeIcon transform='shrink-1 right-2' {...{ icon }}/>
	</button>
)
