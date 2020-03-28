import React from 'react'
import { Card } from 'uikit-react'
import styles from './InnerLayout.module.scss'

export const InnerLayout = ({ children }) => (
  <Card className={styles.innerLayout}>
    <div className={styles.maxWidth + ' uk-align-center'}>
      {children}
    </div>
  </Card>
)
