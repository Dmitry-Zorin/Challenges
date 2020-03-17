import React from "react"
import { Card, Grid } from "uikit-react"
import { Link } from "@reach/router"
import { getChallengeTime } from "../scripts/functions"
import { DataContext } from "../context/DataContext"
import { Loading } from "./loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp, faCheck } from "@fortawesome/free-solid-svg-icons"

export const ChallengeGroup = ({ to, title, group }) => {
  const context = React.useContext(DataContext)
  const icon = {
    "Ongoing": faArrowDown,
    "Upcoming": faArrowUp,
    "Completed": faCheck,
  }[title]

  return (
    <div className='margin'>
      <Link to={to}>
        <Card className='card uk-transition-toggle' tabindex='0' style={{ height: "15em", zIndex: 0 }}>
          <p className='font-size-1-4 uk-text-center'>
            {title}
          </p>
          {context.authorized === undefined ? <Loading/>
            : (group || []).slice(0, 4).map(c =>
              <Grid className='uk-margin-small' key={c._id}>
                <div className='font-size-1-15 uk-width-expand'>
                  {c.name}
                </div>
                <div className='uk-text-meta uk-padding-remove' style={{ marginTop: "0.3em" }}>
                  <FontAwesomeIcon icon={icon} transform='shrink-2'/>
                  {getChallengeTime(c)}
                </div>
              </Grid>,
            )
          }
          <div className='overlay uk-position-right uk-overlay uk-transition-slide-right'>
            <p className='font-size-1-15 uk-position-center'>
              See all
            </p>
          </div>
        </Card>
      </Link>
    </div>
  )
}
