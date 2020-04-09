import React from 'react'
import { getTimeObj, toMs } from 'scripts/time'
import { Grid } from 'uikit-react'
import { capitalize } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from 'routes/Challenge/components/TimeInput/TimeInput.module.scss'

export const TimeInput = (props) => {
	const time = getTimeObj(props.ms)
	
	return (
		<div className='uk-margin-medium'>
			<div className='uk-margin-remove-bottom'>
				{capitalize(props.name)}
				<Grid className='uk-child-width-1-3'>
					<NumberInput
						label='days'
						time={time.days}
						toMs={toMs.DAY}
						{...props}
					/>
					<NumberInput
						label='hours'
						time={time.hours}
						toMs={toMs.HOUR}
						{...props}
					/>
					<NumberInput
						label='minutes'
						time={time.minutes}
						toMs={toMs.MINUTE}
						{...props}
					/>
				</Grid>
			</div>
			<Grid className='uk-child-width-1-3'>
				<NumberButtons toMs={toMs.DAY} {...props}/>
				<NumberButtons toMs={toMs.HOUR} {...props}/>
				<NumberButtons toMs={toMs.MINUTE} step={10} {...props}/>
			</Grid>
		</div>
	)
}

const NumberInput = ({ label, time, toMs, name, ms, handleChange }) => (
	<label className='uk-text-right'>
		{label}
		<input
			pattern="[0-9]*"
			className='uk-input'
			value={time || ''}
			placeholder={time ? undefined : 0}
			onChange={e => {
				if (isNaN(e.target.value)) return
				handleChange(name, ms + (e.target.value - time) * toMs)
			}}
		/>
	</label>
)

const NumberButtons = ({ toMs, name, ms, handleChange, step = 1 }) => (
	<div className='uk-child-width-1-2'>
		<button
			className={`${styles.button} uk-button uk-padding-remove`}
			onClick={() => handleChange(name, ms - step * toMs)}
		>
			<FontAwesomeIcon icon={faMinus} transform='grow-3'/>
		</button>
		<button
			className={`${styles.button} uk-button uk-padding-remove`}
			onClick={() => handleChange(name, ms + step * toMs)}
		>
			<FontAwesomeIcon icon={faPlus} transform='grow-3'/>
		</button>
	</div>
)
