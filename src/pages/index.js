import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Data from "../scripts/data"
import App from "../components/app"
import ReactNotification from "react-notifications-component"

const IndexPage = () =>
  <div>
    <ReactNotification/>
    <App data={new Data(useStaticQuery(
      graphql`{
        site {
          siteMetadata {
            title
            apiServer
            timeout
            notifications {
              name
              value {
                title
                message
                type
              }
            }
          }
        }
      }`,
    ).site.siteMetadata)}/>
  </div>

export default IndexPage
