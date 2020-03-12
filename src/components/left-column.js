import React from "react"
import { Card } from "uikit-react"

const LeftColumn = props =>
  <div id='left-column' className='uk-width-1-3 uk-padding-remove-left'>
    <div className='margin' style={{ height: "calc(100% - 3em)" }}>
      <Card className='card uk-height-1-1'>
        <p className='uk-h3 uk-text-center uk-margin-remove-bottom'>
          Info
        </p>
      </Card>
    </div>
  </div>

export default LeftColumn
