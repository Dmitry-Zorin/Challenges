import React from "react"
import ReactNotification from "react-notifications-component"
import axios from "axios"
import { Router } from "@reach/router"
import { Layout } from "../components/layout"
import { Helmet } from "react-helmet"
import { Login } from "../components/login"
import { Auth } from "../components/auth"
import { NotFoundPage } from "../components/404"
import { DataContext } from "../context/DataContext"
import { graphql } from "gatsby"
import { Loading } from "../components/loading"

const Dashboard = React.lazy(() => import("../components/dashboard"))
const Challenge = React.lazy(() => import("../components/challenge"))
const ChallengeGroupExtended = React.lazy(() => import("../components/challenge-group-extended"))

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      context: {
        ...DataContext._currentValue,
        authorized: false,
      },
    }
    this.authorize = this.authorize.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.authResult = this.authorize()
  }

  componentDidMount() {
    this.authResult.then(res => {
      this.setState({ loading: false })

      if (res.data.data.user.authorized)
        return this.login()

      this.props.navigate("/login")
    })
  }

  authorize() {
    return axios.post(this.state.context.apiServer, {
      query: `{
        user {
          authorized
        }
      }`,
    }, {
      withCredentials: true,
    })
  }

  login() {
    this.setState({
      context: {
        ...this.state.context,
        authorized: true,
      },
    })
  }

  logout() {
    this.setState({
      context: {
        ...this.state.context,
        authorized: false,
      },
    })
  }

  render = () =>
    <div>
      <ReactNotification/>
      <Helmet>
        <title>{this.props.data.site.siteMetadata.title}</title>
      </Helmet>
      <DataContext.Provider value={this.state.context}>
        <Layout title={this.props.data.site.siteMetadata.title}>
          {this.state.loading ? <Loading/> :
            <Router>
              <NotFoundPage default/>
              <Login path="/login" login={this.login} logout={this.logout}/>
              <Auth path="/" Component={Dashboard}/>
              <Auth path="/challenge" Component={Challenge}/>
              <Auth path="/ongoing" Component={ChallengeGroupExtended}/>
              <Auth path="/upcoming" Component={ChallengeGroupExtended}/>
              <Auth path="/completed" Component={ChallengeGroupExtended}/>
            </Router>
          }
        </Layout>
      </DataContext.Provider>
    </div>
}

export const query = graphql`{
  site {
    siteMetadata {
      title
      apiServer
    }
  }
}`
