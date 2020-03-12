import React from "react"
import { Card } from "uikit-react"
import { Link } from "@reach/router"
import { getChallengeName } from "../scripts/functions"

const ChallengeGroup = props =>
  <div className='margin'>
    <Link to={props.to}>
      <Card className='card uk-transition-toggle' tabindex='0' style={{ height: "15em", zIndex: 0 }}>
        <p className='uk-h3 uk-text-center uk-margin-remove-bottom'>
          {props.title}
        </p>
        {props.group.slice(0, 4).map(c =>
          <p key={c._id} className='uk-h4 uk-margin-small'>
            {getChallengeName(c)}
          </p>,
        )}
        <div className='overlay uk-position-right uk-overlay uk-transition-slide-right'>
          <p className='uk-h4 uk-position-center'>
            See all
          </p>
        </div>
      </Card>
    </Link>
  </div>

export default ChallengeGroup
