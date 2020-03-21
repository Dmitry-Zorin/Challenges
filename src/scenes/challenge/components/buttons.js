import { Grid } from "uikit-react"
import React from "react"

export const Buttons = ({ save, saveValue, showCancel }) => (
  <Grid className='uk-flex-center uk-margin-large-top uk-child-width-1-3'>
    {showCancel && <Button value='Cancel' onClick={() => window.history.back()}/>}
    <Button value={saveValue} onClick={save}/>
  </Grid>
)

const Button = ({ value, onClick }) => (
  <div>
    <button className="round-border uk-button uk-width-expand" onClick={onClick}>
      {value}
    </button>
  </div>
)
