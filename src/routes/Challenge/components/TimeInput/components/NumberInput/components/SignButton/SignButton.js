import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedButton from 'components/Animated/AnimatedButton'
import React from 'react'
import { leftButton, rightButton } from './SignButton.module.scss'

const SignButton = ({ sign, icon, timeToMs, ms, setState, step = 1 }) => (
	<AnimatedButton
		type='button'
		className={`${sign < 0 ? leftButton : rightButton} uk-button-default`}
		onClick={() => setState(Math.max(0, ms + sign * step * timeToMs))}
	>
		<FontAwesomeIcon transform='shrink-2' {...{ icon }}/>
	</AnimatedButton>
)

export default SignButton
