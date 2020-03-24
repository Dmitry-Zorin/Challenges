import React from 'react'
import styles from './buttons.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
import { Grid } from 'uikit-react'

export const Buttons = ({ save, saveValue, showCancel }) => {
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        cancel
      }
    }
  }`).site.siteMetadata

  return (
    <Grid className={styles.marginTop + ' uk-flex-center uk-child-width-1-3@m uk-child-width-1-2@s'}>
      {showCancel && <Button value={data.cancel} onClick={() => window.history.back()}/>}
      <Button value={saveValue} onClick={save}/>
    </Grid>
  )
}

const Button = ({ value, onClick }) => (
  <div>
    <button className="round-border uk-button uk-width-expand" onClick={onClick}>
      {value}
    </button>
  </div>
)
