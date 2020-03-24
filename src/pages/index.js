import React from 'react'
import ReactNotification from 'react-notifications-component'
import axios from 'axios'
import { Router } from '@reach/router'
import { Layout } from '../components/layout'
import { Helmet } from 'react-helmet'
import { Login } from '../scenes/login'
import { Auth } from '../components/auth'
import { NotFoundPage } from '../scenes/404'
import { DataContext } from '../services/contexts/DataContext'
import { graphql } from 'gatsby'
import { Dashboard } from '../scenes/dashboard'
import { Challenge } from '../scenes/challenge'
import { ChallengeGroupExtended } from '../scenes/challenge-group-extended'
import { getChallenges, handleError, updateTime } from '../services/helper'

export default class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.updateChallenges = this.updateChallenges.bind(this)
    this.updateState = this.updateState.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)

    this.state = {
      ...DataContext._currentValue,
      challenges: {},
      updateChallenges: this.updateChallenges
    }
    this.authResult = axios.post(
      this.state.apiServer,
      { query: '{ user { isAuthorized } }' },
      { withCredentials: true }
    )
    this.data = this.props.data.site.siteMetadata
  }

  componentDidMount() {
    this.authResult
      .then(res => res.data.data.user.isAuthorized
        ? this.login(true)
        : this.logout())
      .catch(err => handleError(err, 'Failed to check user authorization'))
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  updateChallenges() {
    getChallenges(this.state.apiServer)
      .then(res => this.updateState(res))
  }

  updateState(challenges, isAuthorized = true) {
    updateTime(challenges || this.state.challenges, this.state.apiServer)
      .then(res => this.setState({ challenges: res, isAuthorized }))
  }

  login(useStorage = false) {
    this.interval = setInterval(this.updateState, this.data.timeout)

    const challenges = useStorage &&
      JSON.parse(localStorage.getItem('challenges'))

    challenges
      ? this.updateState(challenges)
      : this.updateChallenges()
  }

  logout() {
    clearInterval(this.interval)
    localStorage.clear()

    this.setState({
      challenges: {},
      isAuthorized: false
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
            <Auth path="/create" Component={Challenge}/>
            <Auth path="/edit" Component={Challenge}/>
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
