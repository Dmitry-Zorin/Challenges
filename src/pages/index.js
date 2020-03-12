import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import ReactNotification from "react-notifications-component"
import Data from "../scripts/data"
import Login from "../components/login"
import Auth from "../components/auth"
import NotFoundPage from "./404"

const Dashboard = React.lazy(() => import("../components/dashboard"))
const Challenge = React.lazy(() => import("../components/challenge"))
const ChallengeGroupExtended = React.lazy(() => import("../components/challenge-group-extended"))

const IndexPage = () => {
  const data = new Data(useStaticQuery(
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
              type
            }
          }
        }
      }
    }`,
  ).site.siteMetadata)

  return (
    <div>
      <ReactNotification/>
      <Layout title={data.title}>
        <Helmet>
          <title>{data.title}</title>
        </Helmet>
        <Router>
          <NotFoundPage default/>
          <Login path='/login' data={data}/>
          <Auth path="/" Component={Dashboard} data={data}/>
          <Auth path="/challenge" Component={Challenge} data={data}/>
          <Auth path="/ongoing" Component={ChallengeGroupExtended} data={data}/>
          <Auth path="/upcoming" Component={ChallengeGroupExtended} data={data}/>
          <Auth path="/completed" Component={ChallengeGroupExtended} data={data}/>
        </Router>
      </Layout>
    </div>
  )
}

export default IndexPage
