import React, { useState } from 'react'
import { getTimeObj, toMs } from 'scripts/time'
import { Flex, Grid } from 'uikit-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	container,
	leftButton,
	rightButton,
	toggle,
	unknown,
} from './TimeInput.module.scss'
import { capitalize } from 'lodash'

export const TimeInput = (props) => {
	const [disabled, setDisabled] = useState(false)
	
	return (
		<div className='uk-margin-medium'>
			<div className='uk-margin-remove-bottom'>
				<Grid>
					<p className='uk-width-expand'>
						{capitalize(props.name)}
					</p>
					<p className={toggle} onClick={() => setDisabled(!disabled)}>
						<FontAwesomeIcon
							icon='toggle-on'
							className={disabled ? '' : 'uk-text-primary'}
							transform='grow-16 left-9 down-0.5'
							flip={disabled ? 'horizontal' : undefined}
						/>
					</p>
				</Grid>
				<div className={container}>
					{disabled ? (
						<Flex className={unknown}>
							<i className='uk-margin-remove'>Unknown</i>
						</Flex>
					) : (
						<Grid className='uk-grid-small uk-child-width-1-3 uk-margin-remove-top'>
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
						</Grid>
					)}
				</div>
			</div>
		</div>
	)
}

const NumberInput = ({ label, time, ...props }) => (
	<div className='uk-text-right'>
		<label className='uk-text-muted'>
			<span style={{ fontSize: '0.95em' }}>{label}</span>
			<input
				type='text'
				pattern='[0-9]*'
				className='uk-input'
				value={time || ''}
				placeholder={time ? undefined : 0}
				onChange={e => {
					if (isNaN(e.target.value)) return
					const timeToMs = toMs[label.slice(0, -1).toUpperCase()]
					props.setState(props.ms + (e.target.value - time) * timeToMs)
				}}
			/>
		</label>
		<div className='uk-child-width-1-2'>
			<NumberButton sign={-1} icon='minus' {...props}/>
			<NumberButton sign={+1} icon='plus' {...props}/>
		</div>
	</div>
)

const NumberButton = ({ sign, icon, timeToMs, ms, setState, step = 1 }) => (
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
		<FontAwesomeIcon icon={icon} transform='shrink-1'/>
	</button>
)
