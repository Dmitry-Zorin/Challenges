import React from "react"
import { Card } from "uikit-react"
import styles from './left-column.module.scss'

export const LeftColumn = () =>
  <div className={styles.leftColumn + ' uk-width-1-3 uk-padding-remove-left'}>
    <div className={styles.fullHeight}>
      <Card className='uk-height-1-1'>
        <p className='font-size-large uk-text-center uk-margin-remove-bottom'>
          Info
        </p>
      </Card>
    </div>
  </div>
