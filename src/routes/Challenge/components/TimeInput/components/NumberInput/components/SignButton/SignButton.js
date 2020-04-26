import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedButton from 'components/animated/AnimatedButton'
import React from 'react'
import { button, left, right } from './SignButton.module.scss'

const SignButton = ({ sign, icon, timeToMs, ms, setState, step = 1 }) => (
	<AnimatedButton
		type='button'
		className={[button, sign < 0 ? left : right].join(' ')}
		onClick={() => setState(Math.max(0, ms + sign * step * timeToMs))}
	>
		<FontAwesomeIcon className='icon-center' transform='shrink-2' {...{ icon }}/>
	</AnimatedButton>
)

export default SignButton
