import { Grid } from "uikit-react"
import React from "react"

const toMs = {
  DAY: 864e5,
  HOUR: 36e5,
  MINUTE: 6e4
}

export const TimeInput = props => {
  const _props = {
    ...props,
    ms: props.ms || 0,
  }

  const types = {
    days: {
      label: "days",
      time: _props.ms / toMs.DAY | 0,
      toMs: toMs.DAY,
    },
    hours: {
      label: "hours",
      time: _props.ms % toMs.DAY / toMs.HOUR | 0,
      toMs: toMs.HOUR,
    },
    minutes: {
      label: "minutes",
      time: _props.ms % toMs.HOUR / toMs.MINUTE | 0,
      toMs: toMs.MINUTE,
    },
  }

  return (
    <div className='uk-margin-medium'>
      {_props.name[0].toUpperCase() + _props.name.slice(1)}
      <Grid>
        <NumberInput {...types.days} {..._props}/>
        <NumberInput {...types.hours} {..._props}/>
        <NumberInput {...types.minutes} {..._props} step={10}/>
      </Grid>
    </div>
  )
}

const NumberInput = ({ label, time, toMs, name, ms, handleChange, step }) => (
  <label className='uk-width-1-3 uk-text-right'>
    {label}
    <input
      type='number' className='uk-input' value={time || ""}
      placeholder={time ? undefined : 0} step={step}
      onChange={e => handleChange(name, ms + (e.target.value - time) * toMs)}
    />
  </label>
)
