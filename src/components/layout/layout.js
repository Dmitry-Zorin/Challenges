import React from "react"
import styles from "./layout.module.scss"
import { graphql, useStaticQuery } from "gatsby"
import { Container } from "uikit-react"
import { NavigationBar } from "./components/navbar"

export const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        title
      }
    }
  }`).site.siteMetadata

  return (
    <div>
      <NavigationBar/>
      <Container className={styles.layout}>
        <div className={styles.header + " uk-text-center"}>
          <p className={styles.title}>
            {data.title}
          </p>
        </div>
        {children}
      </Container>
    </div>
  )
}
