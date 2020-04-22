import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { upperFirst } from 'lodash'
import React, { useState } from 'react'
import { getTimeObj, toMs } from 'scripts/time'
import { Flex, Margin } from 'uikit-react'
import NumberInput from './components/NumberInput'
import { container, toggle, unknown } from './TimeInput.module.scss'

const TimeInput = (props) => {
	const [disabled, setDisabled] = useState(false)
	
	return (
		<Margin type='medium'>
			<Flex>
				<p className='text-secondary uk-width-expand'>
					{upperFirst(props.name)}
				</p>
				<div
					className={toggle} onClick={() => {
					props.setState(disabled ? 0 : toMs.TOO_MANY_YEARS)
					setDisabled(!disabled)
				}}
				>
					<FontAwesomeIcon
						icon='toggle-on'
						className={`uk-text-${disabled ? 'muted' : 'primary'}`}
						transform='grow-16 left-9 down-0.5'
						flip={disabled ? 'horizontal' : undefined}
					/>
				</div>
			</Flex>
			<div className={container}>
				{disabled ? (
					<Flex className={unknown}>
						<i>Unknown</i>
					</Flex>
				) : (
					<Flex className='uk-grid-small uk-child-width-1-3 uk-margin-remove-top'>
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
			</div>
		</Margin>
	)
}

export default TimeInput
