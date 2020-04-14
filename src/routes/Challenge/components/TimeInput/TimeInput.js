import React from 'react'
import { getTimeObj, toMs } from 'scripts/time'
import { Grid } from 'uikit-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { button } from 'routes/Challenge/components/TimeInput/TimeInput.module.scss'

const gridStyle = 'uk-grid-small uk-child-width-1-3'
const { DAY, HOUR, MINUTE } = toMs

export const TimeInput = (props) => (
	<div className='uk-margin-medium'>
		<div className='uk-margin-remove-bottom uk-text-capitalize'>
			{props.name}
			<Grid className={gridStyle} style={{ marginTop: '-0.5em' }}>
				{Object.entries(getTimeObj(props.ms)).map(([l, t]) => (
					<NumberInput key={l} label={l} time={t} {...props}/>
				))}
			</Grid>
		</div>
		<Grid className={gridStyle}>
			<NumberButtons timeToMs={DAY} {...props}/>
			<NumberButtons timeToMs={HOUR} {...props}/>
			<NumberButtons timeToMs={MINUTE} step={10} {...props}/>
		</Grid>
	</div>
)

const NumberInput = ({ label, time, ms, setState }) => (
	<label className='uk-text-right uk-text-muted uk-text-lowercase'>
		{label}
		<input
			type='text'
			pattern='[0-9]*'
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
		<NumberButton sign={-1} icon='minus' {...props}/>
		<NumberButton sign={+1} icon='plus' {...props}/>
	</div>
)

const NumberButton = ({ sign, icon, timeToMs, ms, setState, step = 1 }) => (
	<button
		type='button'
		className={`${button} uk-button uk-button-default uk-padding-remove`}
		onClick={() => setState(Math.max(0, ms + sign * step * timeToMs))}
	>
		<FontAwesomeIcon icon={icon} transform='shrink-1'/>
	</button>
)
