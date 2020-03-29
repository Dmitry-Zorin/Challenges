import React from 'react'
import { getTimeObj, toMs } from '../../../services/helper'
import { Grid } from 'uikit-react'

export const TimeInput = props => {
	const time = getTimeObj(props.ms)

	return (
		<div className='uk-margin-medium'>
			{props.name}
			<Grid>
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
					step={10}
					{...props}
				/>
			</Grid>
		</div>
	)
}

const NumberInput = ({ label, time, toMs, name, ms, handleChange, step }) => (
	<label className='uk-width-1-3 uk-text-right'>
		{label}
		<input
			type='number'
			className='uk-input'
			value={time || ''}
			placeholder={time ? undefined : 0}
			step={step}
			onChange={e => handleChange(
				name.toLowerCase(),
				ms + (e.target.value - time) * toMs,
			)}
		/>
	</label>
)
