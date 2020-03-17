import React from "react"
import { Card } from "uikit-react"
import { Link } from "@reach/router"

export const NewChallengeButton = () =>
  <div className='margin'>
    <Link to='/challenge' className='uk-margin-remove uk-padding-remove'>
      <Card id='create-challenge' className='card uk-transition-toggle' tabindex='0' style={{ zIndex: 0 }}>
        <p className='font-size-1-4 uk-text-center'>
          NEW CHALLENGE
        </p>
        <div className='overlay uk-position-right uk-overlay uk-transition-slide-right'>
          <p className='font-size-1-15 uk-position-center'>
            Create
          </p>
        </div>
      </Card>
    </Link>
  </div>
