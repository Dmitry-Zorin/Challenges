import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { getTimeObj, toMs } from 'scripts/time'
import { Flex } from 'uikit-react'
import { NumberInput } from './components/NumberInput'
import { container, toggle, unknown } from './TimeInput.module.scss'

export const TimeInput = (props) => {
	const [disabled, setDisabled] = useState(false)
	
	return (
		<div className='uk-margin-medium'>
			<div className='uk-margin-remove-bottom'>
				<Flex>
					<p className='uk-width-expand uk-text-capitalize'>
						{props.name}
					</p>
					<div className={toggle} onClick={() => setDisabled(!disabled)}>
						<FontAwesomeIcon
							icon='toggle-on'
							className={disabled ? '' : 'uk-text-primary'}
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
			</div>
		</div>
	)
}
