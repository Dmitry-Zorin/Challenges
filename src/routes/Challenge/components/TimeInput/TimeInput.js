import React from 'react'
import { getTimeObj, toMs } from 'scripts/time'
import { Button, Grid } from 'uikit-react'
import { capitalize } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from 'routes/Challenge/components/TimeInput/TimeInput.module.scss'

export const TimeInput = (props) => (
	<div className='uk-margin-medium'>
		<div className='uk-margin-remove-bottom'>
			{capitalize(props.name)}
			<Grid className='uk-child-width-1-3'>
				{Object.entries(getTimeObj(props.ms)).map(([l, t]) => (
					<NumberInput key={l} label={l} time={t} {...props}/>
				))}
			</Grid>
		</div>
		<Grid className='uk-child-width-1-3'>
			<NumberButtons timeToMs={toMs.DAY} {...props}/>
			<NumberButtons timeToMs={toMs.HOUR} {...props}/>
			<NumberButtons timeToMs={toMs.MINUTE} step={10} {...props}/>
		</Grid>
	</div>
)

const NumberInput = ({ label, time, name, ms, handleChange }) => (
	<label className='uk-text-right'>
		{label}
		<input
			className='uk-input'
			pattern="[0-9]*"
			value={time || ''}
			placeholder={time ? undefined : 0}
			onChange={e => {
				if (isNaN(e.target.value)) return
				const timeToMs = toMs[label.slice(0, -1).toUpperCase()]
				handleChange(name, ms + (e.target.value - time) * timeToMs)
			}}
		/>
	</label>
)

const NumberButtons = (props) => (
	<div className='uk-child-width-1-2'>
		<NumberButton sign={-1} icon={faMinus} {...props}/>
		<NumberButton sign={+1} icon={faPlus} {...props}/>
	</div>
)

const NumberButton = ({ sign, icon, timeToMs, name, ms, handleChange, step = 1 }) => (
	<Button
		className={`${styles.button} uk-padding-remove`}
		onClick={() => handleChange(name, ms + sign * step * timeToMs)}
	>
		<FontAwesomeIcon icon={icon}/>
	</Button>
)
