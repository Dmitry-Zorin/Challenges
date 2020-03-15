import React from "react"
import { Card } from "uikit-react"
import { Link } from "@reach/router"
import { getChallengeTime } from "../scripts/functions"

export const ChallengeGroup = props =>
  <div className='margin'>
    <Link to={props.to}>
      <Card className='card uk-transition-toggle' tabindex='0' style={{ height: "15em", zIndex: 0 }}>
        <p className='font-size-1-4 uk-text-center'>
          {props.title}
        </p>
        {props.group.slice(0, 4).map(c =>
          <div className='wrap uk-margin-small' key={c._id}>
            <span className='font-size-1-15'>
              {c.name}
            </span>
            <span className='uk-text-meta'>
              {getChallengeTime(c)}
            </span>
          </div>,
        )}
        <div className='overlay uk-position-right uk-overlay uk-transition-slide-right'>
          <p className='font-size-1-15 uk-position-center'>
            See all
          </p>
        </div>
      </Card>
    </Link>
  </div>
