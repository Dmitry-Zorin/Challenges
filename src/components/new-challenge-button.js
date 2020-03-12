import React from "react"
import { Card } from "uikit-react"
import { Link } from "@reach/router"

const NewChallengeButton = props =>
  <div className='margin'>
    <Link to='/challenge' className='uk-margin-remove uk-padding-remove'>
      <Card id='start' className='card uk-transition-toggle' tabindex='0' style={{ zIndex: 0 }}>
        <p className='uk-h3 uk-text-center'>
          NEW CHALLENGE
        </p>
        <div className='overlay uk-position-right uk-overlay uk-transition-slide-right'>
          <p className='uk-h4 uk-position-center'>
            Create
          </p>
        </div>
      </Card>
    </Link>
  </div>

export default NewChallengeButton
