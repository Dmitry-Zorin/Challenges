import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getTimeObj, toMs } from "../../../services/helper"
import { Grid } from "uikit-react"

export const TimeInput = props => {
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        days
        hours
        minutes
      }
    }
  }`).site.siteMetadata

  const time = getTimeObj(props.ms)

  return (
    <div className='uk-margin-medium'>
      {props.name}
      <Grid>
        <NumberInput label={data.days} time={time.days} toMs={toMs.DAY} {...props}/>
        <NumberInput label={data.hours} time={time.hours} toMs={toMs.HOUR} {...props}/>
        <NumberInput label={data.minutes} time={time.minutes} toMs={toMs.MINUTE} {...props} step={10}/>
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
