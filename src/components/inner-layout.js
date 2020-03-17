import React from "react"
import { Card } from "uikit-react"

export const InnerLayout = ({ children }) => (
  <div className='margin'>
    <Card id='inner-layout' className='card uk-card'>
      <div className='uk-align-center' style={{ maxWidth: "800px" }}>
        {children}
      </div>
    </Card>
  </div>
)
