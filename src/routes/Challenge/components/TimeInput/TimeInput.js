import AnimatedDiv from 'components/animated/AnimatedDiv'
import AnimatedSwitch from 'components/animated/AnimatedSwitch'
import { upperFirst } from 'lodash'
import React, { useState } from 'react'
import { getTimeObj, toMs } from 'scripts/time'
import NumberInput from './components/NumberInput'
import { container, unknown } from './TimeInput.module.scss'

const TimeInput = (props) => {
	const [disabled, setDisabled] = useState(props.ms > toMs.MANY_YEARS)
	
	return (
		<AnimatedDiv className='padding-input'>
			<div className='uk-flex uk-flex-middle'>
				<p className='uk-text-primary uk-width-expand'>
					{upperFirst(props.name)}
				</p>
				<AnimatedSwitch
					isOn={!disabled}
					onClick={() => {
						props.setState(disabled ? 0 : toMs.TOO_MANY_YEARS)
						setDisabled(!disabled)
					}}
				/>
			</div>
			<AnimatedDiv
				key={disabled}
				className={container}
				transition={{ duration: 0.25 }}
			>
				{disabled ? (
					<div className={`${unknown} uk-flex uk-flex-center uk-flex-middle`}>
						<p className='uk-text-italic'>Unknown</p>
					</div>
				) : (
					<div className='uk-flex uk-grid-small uk-child-width-expand'>
						{Object.entries(getTimeObj(props.ms)).map(([l, t]) => (
							<NumberInput
								key={l}
								label={l}
								time={t}
								timeToMs={toMs[l.toUpperCase().slice(0, -1)]}
								step={l === 'minutes' ? 10 : 1}
								{...props}
							/>
						))}
					</div>
				)}
			</AnimatedDiv>
		</AnimatedDiv>
	)
}

export default TimeInput
