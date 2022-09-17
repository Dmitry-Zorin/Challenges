import Button from 'components/Button'
import { toMs } from 'scripts/time'

const NumberInput = ({ label, time, ms, setState, timeToMs, step }) => {
	const setTime = (e) => {
		const value = e.target.value
		if (isNaN(value)) return

		const timeToMs = toMs[label.slice(0, -1).toUpperCase()]
		setState(ms + (value - time) * timeToMs)
	}

	return (
		<div className="uk-text-right uk-width-1-1 uk-position-relative">
			<label className="uk-text-muted">
				{label}
				<input
					type="number"
					pattern="[0-9]*"
					className="uk-input uk-text-center"
					value={time || ''}
					placeholder={time ? undefined : 0}
					onChange={setTime}
				/>
			</label>
			{[-1, 1].map((sign) => (
				<Button
					key={sign}
					className={`uk-position-bottom-${
						sign > 0 ? 'right' : 'left'
					} sign uk-width-1-3`}
					style={{
						height: 36,
						margin: 2,
						marginLeft: 17,
						background: 'transparent',
					}}
					icon={sign < 0 ? 'minus' : 'plus'}
					onClick={() => setState(Math.max(0, ms + sign * step * timeToMs))}
					type=""
				/>
			))}
		</div>
	)
}

export default NumberInput
