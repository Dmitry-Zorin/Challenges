import React from "react"
import styles from "./new-challenge-button.module.scss"
import dashboardStyles from "../dashboard.module.scss"
import { graphql, useStaticQuery } from "gatsby"
import { Card } from "uikit-react"
import { Link } from "@reach/router"

export const NewChallengeButton = () => {
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        newChallenge
        create
      }
    }
  }`).site.siteMetadata

  return (
    <Link to='/create' className='uk-margin-remove uk-padding-remove'>
      <Card className={styles.createChallenge + " uk-transition-toggle"} tabindex='0'>
        <p className='font-size-large uk-text-center'>
          {data.newChallenge.toUpperCase()}
        </p>
        <div className={dashboardStyles.overlay + " uk-position-right uk-overlay uk-transition-slide-right"}>
          <p className='font-size-medium uk-position-center'>
            {data.create}
          </p>
        </div>
      </Card>
    </Link>
  )
}
