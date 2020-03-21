import React from "react"
import { Container, Flex } from "uikit-react"
import { NavigationBar } from "./components/navbar"

export const Layout = ({ title, children }) => (
  <div>
    <NavigationBar title={title}/>
    <Container id='layout' style={{ paddingBottom: "2em" }}>
      <Flex className='uk-flex-middle' style={{ height: "6em", marginTop: "2.5em" }}>
        <p id='title' className='uk-align-center'>
          {title}
        </p>
      </Flex>
      {children}
    </Container>
  </div>
)


