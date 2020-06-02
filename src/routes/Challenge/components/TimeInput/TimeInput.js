import { Animation, Switch } from 'components'
import { motion } from 'framer-motion'
import { upperFirst } from 'lodash'
import React, { useState } from 'react'
import { getTimeObj, toMs } from 'scripts/time'
import NumberInput from './components/NumberInput'
import { unknown } from './TimeInput.module.scss'

const TimeInput = ({ ms, ...props }) => {
	const [disabled, setDisabled] = useState(ms > toMs.MANY_YEARS)
	
	return (
		<div className='padding-text-top'>
			<div className='uk-flex uk-flex-middle'>
				<p className='uk-text-primary uk-width-expand'>
					{upperFirst(props.name)}
				</p>
				<Switch
					isOn={!disabled}
					onClick={() => {
						props.setState(disabled ? 0 : toMs.TOO_MANY_YEARS)
						setDisabled(!disabled)
					}}
				/>
			</div>
			<div className='uk-position-relative'>
				<motion.div
					className='uk-flex uk-grid-small'
					initial={false}
					animate={disabled
						? { opacity: 0, transition: { duration: 0 } }
						: { opacity: 1 }
					}
				>
					{Object.entries(getTimeObj(ms)).map(([l, t]) => (
						<NumberInput
							key={l}
							label={l}
							time={disabled ? 0 : t}
							timeToMs={toMs[l.toUpperCase().slice(0, -1)]}
							step={l === 'minutes' ? 10 : 1}
							{...{ ms, ...props }}
						/>
					))}
				</motion.div>
				{disabled && (
					<Animation type='fade' className={`${unknown} uk-position-cover`}>
						<p className='uk-position-center uk-text-italic'>
							Unknown
						</p>
					</Animation>
				)}
			</div>
		</div>
	)
}

export default TimeInput
