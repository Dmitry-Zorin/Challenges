import React from "react"
import { Container } from "uikit-react"
import { NavigationBar } from "./components/navbar"
import styles from "./layout.module.scss"

export const Layout = ({ title, children }) =>
  <div>
    <NavigationBar title={title}/>
    <Container className={styles.layout}>
      <div className={styles.header + " uk-text-center"}>
        <p className={styles.title}>
          {title}
        </p>
      </div>
      {children}
    </Container>
  </div>
