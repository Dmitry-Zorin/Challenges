import React from 'react'
import styles from './left-column.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
import { Card } from 'uikit-react'

export const LeftColumn = () => {
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        info
      }
    }
  }`).site.siteMetadata

  return (
    <div className={styles.leftColumn + ' uk-width-1-3 uk-padding-remove-left'}>
      <div className={styles.fullHeight}>
        <Card className='uk-height-1-1'>
          <p className='font-size-large uk-text-center uk-margin-remove-bottom'>
            {data.info}
          </p>
        </Card>
      </div>
    </div>
  )
}
