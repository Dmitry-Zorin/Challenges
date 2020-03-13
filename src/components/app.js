import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import Login from "../components/login"
import Auth from "../components/auth"
import NotFoundPage from "../components/404"

const Dashboard = React.lazy(() => import("../components/dashboard"))
const Challenge = React.lazy(() => import("../components/challenge"))
const ChallengeGroupExtended = React.lazy(() => import("../components/challenge-group-extended"))

const loggedInState = {
  authorized: true,
  action: "Log Out",
}

const loggedOutState = {
  authorized: false,
  action: "Log In",
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = !!localStorage.getItem("authorized") ?
      loggedInState : loggedOutState

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login() {
    this.setState(loggedInState)
  }

  logout() {
    this.setState(loggedOutState)
  }

  render = () => (
    <Layout title={this.props.data.title} action={this.state.action}>
      <Helmet>
        <title>{this.props.data.title}</title>
      </Helmet>
      <Router>
        <NotFoundPage default/>
        <Login path="/login" data={this.props.data} auth={this.state.authorized}
               login={this.login} logout={this.logout}/>
        <Auth path="/" Component={Dashboard} data={this.props.data}/>
        <Auth path="/challenge" Component={Challenge} data={this.props.data}/>
        <Auth path="/ongoing" Component={ChallengeGroupExtended} data={this.props.data}/>
        <Auth path="/upcoming" Component={ChallengeGroupExtended} data={this.props.data}/>
        <Auth path="/completed" Component={ChallengeGroupExtended} data={this.props.data}/>
      </Router>
    </Layout>
  )
}

export default App
