import AnimatedDiv from 'components/animated/AnimatedDiv'
import AnimatedSwitch from 'components/animated/AnimatedSwitch'
import { upperFirst } from 'lodash'
import React, { useState } from 'react'
import { getTimeObj, toMs } from 'scripts/time'
import { Flex } from 'uikit-react'
import NumberInput from './components/NumberInput'
import { container, unknown } from './TimeInput.module.scss'

const TimeInput = (props) => {
	const [disabled, setDisabled] = useState(false)
	
	return (
		<AnimatedDiv className='uk-margin-medium'>
			<Flex>
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
			</Flex>
			<AnimatedDiv
				key={disabled}
				transition={{ duration: 0.3 }}
				className={container}
			>
				{disabled ? (
					<Flex className={unknown}>
						<p className='uk-margin-auto-vertical uk-text-italic'>
							Unknown
						</p>
					</Flex>
				) : (
					<Flex className='uk-grid-small uk-child-width-1-3'>
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
					</Flex>
				)}
			</AnimatedDiv>
		</AnimatedDiv>
	)
}

export default TimeInput
