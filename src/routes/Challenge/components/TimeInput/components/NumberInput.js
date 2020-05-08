import AnimatedButton from 'components/animated/AnimatedButton'
import React, { useCallback } from 'react'
import { toMs } from 'scripts/time'

const NumberInput = ({ label, time, ms, setState, timeToMs, step }) => {
	const setTime = useCallback(
		e => {
			const value = e.target.value
			if (isNaN(value)) return
			
			const timeToMs = toMs[label.slice(0, -1).toUpperCase()]
			setState(ms + (value - time) * timeToMs)
		},
		[label, setState, ms, time],
	)
	
	return (
		<div className='uk-text-right' data-uk-margin>
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
			<div className='uk-flex uk-child-width-expand'>
				{[-1, 1].map(sign => (
					<div className={sign < 0 ? '' : 'uk-margin-small-left'}>
						<AnimatedButton
							key={sign}
							icon={sign < 0 ? 'minus' : 'plus'}
							onClick={() => setState(Math.max(0, ms + sign * step * timeToMs))}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default NumberInput
