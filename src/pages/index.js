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
import { Dashboard } from "../components/dashboard"
import { Challenge } from "../components/challenge"
import { ChallengeGroupExtended } from "../components/challenge-group-extended"
import { getChallenges, handleError, updateTime } from "../scripts/functions"

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.updateChallenges = this.updateChallenges.bind(this)
    this.updateState = this.updateState.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)

    this.state = {
      ...DataContext._currentValue,
      challenges: {},
      updateChallenges: this.updateChallenges,
    }
    this.authResult = axios.post(
      this.state.apiServer, {
        query: `{
          user {
            authorized
          }
        }`,
      }, { withCredentials: true },
    )
    this.data = this.props.data.site.siteMetadata
  }

  componentDidMount() {
    this.authResult
      .then(res =>
        res.data.data.user.authorized
          ? this.login(true)
          : this.logout(),
      )
      .catch(err => handleError(err, "Failed to check user authorization"))
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  updateChallenges() {
    getChallenges(this.state.apiServer)
      .then(res => this.updateState(res))
  }

  updateState(challenges, authorized = true) {
    updateTime(challenges || this.state.challenges)
      .then(res => this.setState({ challenges: res, authorized }))
  }

  login(useStorage = false) {
    this.interval = setInterval(this.updateState, this.data.timeout)

    const challenges = useStorage &&
      JSON.parse(localStorage.getItem("challenges"))

    challenges
      ? this.updateState(challenges)
      : this.updateChallenges()
  }

  logout() {
    clearInterval(this.interval)
    localStorage.clear()

    this.setState({
      challenges: {},
      authorized: false,
    })
  }

  render = () =>
    <div>
      <ReactNotification/>
      <Helmet>
        <title>{this.data.title}</title>
      </Helmet>
      <DataContext.Provider value={this.state}>
        <Layout title={this.data.title}>
          <Router>
            <NotFoundPage default/>
            <Dashboard path='/'/>
            <Login path="/login" login={this.login} logout={this.logout}/>
            <Auth path="/challenge" component={Challenge}/>
            <ChallengeGroupExtended path="/ongoing"/>
            <ChallengeGroupExtended path="/upcoming"/>
            <ChallengeGroupExtended path="/completed"/>
          </Router>
        </Layout>
      </DataContext.Provider>
    </div>
}

export const query = graphql`{
  site {
    siteMetadata {
      timeout
      title
    }
  }
}`
