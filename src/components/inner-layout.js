import React from "react"
import { Card } from "uikit-react"

export const InnerLayout = props => (
  <div className='margin'>
    <Card id='inner-layout' className='card uk-card'>
      <div className='uk-align-center' style={{ maxWidth: "800px" }}>
        {props.children}
      </div>
    </Card>
  </div>
)
