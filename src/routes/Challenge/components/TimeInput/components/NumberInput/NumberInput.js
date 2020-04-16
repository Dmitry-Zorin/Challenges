import React, { useCallback } from 'react'
import { toMs } from 'scripts/time'
import { SignButton } from './components/SignButton'

export const NumberInput = ({ label, time, ...props }) => {
	const setTime = useCallback(
		e => {
			const value = e.target.value
			if (isNaN(value)) return
			
			const timeToMs = toMs[label.slice(0, -1).toUpperCase()]
			props.setState(props.ms + (value - time) * timeToMs)
		},
		[label, time, props],
	)
	
	return (
		<div className='uk-text-right'>
			<label className='uk-text-muted' style={{ fontSize: '0.95em' }}>
				{label}
				<input
					type='text'
					pattern='[0-9]*'
					className='uk-input'
					value={time || ''}
					placeholder={time ? undefined : 0}
					onChange={setTime}
				/>
			</label>
			<div className='uk-child-width-1-2'>
				<SignButton sign={-1} icon='minus' {...props}/>
				<SignButton sign={+1} icon='plus' {...props}/>
			</div>
		</div>
	)
}
