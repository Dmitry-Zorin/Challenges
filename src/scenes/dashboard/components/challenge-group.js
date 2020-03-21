import React from "react"
import { Card, Grid } from "uikit-react"
import { Link } from "@reach/router"
import { getChallengeTime } from "../../../services/helper"
import { DataContext } from "../../../services/contexts/DataContext"
import { Loading } from "../../../components/loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp, faCheck } from "@fortawesome/free-solid-svg-icons"

export const ChallengeGroup = ({ to, title, group }) => {
  const context = React.useContext(DataContext)

  return (
    <div className='margin'>
      <Link to={to}>
        <Card className='card uk-transition-toggle' tabindex='0' style={{ height: "15em", zIndex: 0 }}>
          <p className='font-size-1-4 uk-text-center'>
            {title}
          </p>
          {context.isAuthorized === undefined ? <Loading/>
            : (group || []).slice(0, 4).map(c =>
              <Item key={c._id} title={title} challenge={c}/>,
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

const icons = {
  "Ongoing": faArrowDown,
  "Upcoming": faArrowUp,
  "Completed": faCheck,
}

const Item = ({ title, challenge }) => (
  <Grid className='uk-margin-small' key={challenge._id}>
    <div className='font-size-1-15 uk-width-expand'>
      {challenge.name}
    </div>
    <div className='uk-text-meta uk-padding-remove' style={{ marginTop: "0.3em" }}>
      <FontAwesomeIcon icon={icons[title]} transform='shrink-2'/>
      {getChallengeTime(challenge)}
    </div>
  </Grid>
)
