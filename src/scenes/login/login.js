import React from 'react'
import axios from 'axios'
import { graphql, StaticQuery } from 'gatsby'
import { Form } from 'uikit-react'
import { InnerLayout } from '../../components/inner-layout'
import { addNotification, handleError } from '../../services/helper'
import { DataContext } from '../../services/contexts/DataContext'
import { notifications } from '../../services/data/notifications'
import { SwitcherItem } from '../../components/switcher-item'
import { TextInput } from '../../components/text-input'

const states = {
  login: {
    action: 'login',
    title: 'Log In'
  },
  signUp: {
    action: 'signUp',
    title: 'Sign Up'
  }
}

const getQuery = action =>
  `mutation(
    $username: String!
    $password: String!
  ) {
    ${action}(
      username: $username
      password: $password
    ) {
      username
    }
  }`

export const Login = props => (
  <StaticQuery
    query={
      graphql`{
        site {
          siteMetadata {
            username
            password
          }
        }
      }`
    }
    render={
      data => <Component data={data.site.siteMetadata} {...props}/>
    }
  />
)

class Component extends React.PureComponent {
  static contextType = DataContext

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.state = states.login
  }

  componentDidMount() {
    if (this.context.isAuthorized)
      this.logout()
  }

  handleChange(name, value) {
    console.log(this.state)
    this.setState({ [name]: value })
  }

  login() {
    axios.post(this.context.apiServer,
      {
        query: getQuery(this.state.action),
        variables: {
          username: this.state.username,
          password: this.state.password
        }
      },
      { withCredentials: true }
    )
      .then(res => {
        if (!res.data.data[this.state.action].username)
          return this.state.action === 'login'
            ? addNotification(notifications.loginFailed)
            : addNotification(notifications.error)

        this.props.login()
        this.props.navigate('/')
      })
      .catch(err => handleError(err, `Failed to ${this.state.title.toLowerCase()}`))
  }

  logout() {
    axios.post(
      this.context.apiServer,
      { query: 'mutation { logout { username } }' },
      { withCredentials: true }
    )
      .then(res => {
        if (res.data.data.logout.username)
          return this.props.logout()

        addNotification(notifications.error)
        window.history.back()
      })
      .catch(err => handleError(err, 'Failed to log out'))
  }

  render = () => {
    const { data } = this.props

    return (
      <InnerLayout>
        <p className='uk-h2 uk-text-center'>
          {this.state.title}
        </p>
        <ul
          className='uk-subnav uk-subnav-pill uk-flex-center uk-child-width-1-3@m uk-child-width-1-2@s'
          data-uk-switcher={true}
        >
          <SwitcherItem
            value={states.login.title}
            onClick={() => this.setState(states.login)}
          />
          <SwitcherItem
            value={states.signUp.title}
            onClick={() => this.setState(states.signUp)}
          />
        </ul>
        <Form>
          <TextInput
            label={data.username} value={this.state.username}
            handleChange={this.handleChange}
          />
          <TextInput
            label={data.password} value={this.state.password}
            handleChange={this.handleChange} isPassword={true}
          />
          <button
            className='uk-button uk-align-center uk-margin-remove-bottom uk-margin-large-top'
            onClick={this.login}
          >
            {this.state.title}
          </button>
        </Form>
      </InnerLayout>
    )
  }
}
