import React from 'react'
import styles from './challenge-group.module.scss'
import dashboardStyles from '../dashboard.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
import { Card, Grid } from 'uikit-react'
import { Link } from '@reach/router'
import { getChallengeTime } from '../../../services/helper'
import { DataContext } from '../../../services/contexts/DataContext'
import { Loading } from '../../../components/loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faCheck } from '@fortawesome/free-solid-svg-icons'

export const ChallengeGroup = ({ to, title, group }) => {
  const context = React.useContext(DataContext)
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        seeAll
      }
    }
  }`).site.siteMetadata

  return (
    <Link to={to}>
      <Card className={styles.card + ' uk-transition-toggle'} tabindex='0'>
        <p className='font-size-large uk-text-center'>
          {title}
        </p>
        {context.isAuthorized === undefined ? <Loading/>
          : (group || []).slice(0, 4).map(c =>
            <Item key={c._id} title={title} challenge={c}/>
          )
        }
        <div className={dashboardStyles.overlay + ' uk-position-right uk-overlay uk-transition-slide-right'}>
          <p className='font-size-medium uk-position-center'>
            {data.seeAll}
          </p>
        </div>
      </Card>
    </Link>
  )
}

const icons = {
  'Ongoing': faArrowDown,
  'Upcoming': faArrowUp,
  'Completed': faCheck
}

const Item = ({ title, challenge }) => (
  <Grid className='uk-margin-small' key={challenge._id}>
    <div className='font-size-medium uk-width-expand'>
      {challenge.name}
    </div>
    <div className={styles.marginTop + ' uk-text-meta uk-padding-remove'}>
      <FontAwesomeIcon icon={icons[title]} transform='shrink-2'/>
      {getChallengeTime(challenge)}
    </div>
  </Grid>
)
