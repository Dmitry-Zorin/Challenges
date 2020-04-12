import React from 'react'
import { getTimeObj, toMs } from 'scripts/time'
import { Grid } from 'uikit-react'
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

const NumberInput = ({ label, time, ms, setState }) => (
	<label className='uk-text-right'>
		{label}
		<input
			type='text'
			pattern="[0-9]*"
			className='uk-input'
			value={time || ''}
			placeholder={time ? undefined : 0}
			onChange={e => {
				if (isNaN(e.target.value)) return
				const timeToMs = toMs[label.slice(0, -1).toUpperCase()]
				setState(ms + (e.target.value - time) * timeToMs)
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

const NumberButton = ({ sign, icon, timeToMs, ms, setState, step = 1 }) => (
	<button
		type='button'
		className={`${styles.button} uk-button uk-button-default uk-padding-remove`}
		onClick={() => setState(ms + sign * step * timeToMs)}
	>
		<FontAwesomeIcon icon={icon}/>
	</button>
)
