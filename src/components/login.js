import React from "react"
import axios from "axios"
import { Form } from "uikit-react"
import { InnerLayout } from "./inner-layout"
import { addNotification, handleError } from "../scripts/functions"
import { DataContext } from "../context/DataContext"
import { notifications } from "../data/notifications"

const loginState = {
  action: "login",
  title: "Log In",
}

const signUpState = {
  action: "signUp",
  title: "Sign Up",
}

export class Login extends React.PureComponent {
  static contextType = DataContext

  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.state = loginState
  }

  componentDidMount() {
    if (this.context.authorized)
      this.logout()
  }

  login(data) {
    axios.post(this.context.apiServer, {
      query: `mutation(
        $username: String!,
        $password: String!,
      ) {
        ${this.state.action}(
          username: $username,
          password: $password,
        ) {
          username
        }
      }`,
      variables: {
        username: data.username,
        password: data.password,
      },
    }, { withCredentials: true })
      .then(res => {
        if (!res.data.data[this.state.action].username)
          return this.state.action === "login" ?
            addNotification(notifications.loginFailed) :
            addNotification(notifications.error)

        this.props.login()
        this.props.navigate("/")
      })
      .catch(err => handleError(err, `Failed to ${this.state.title.toLowerCase()}`))
  }

  logout() {
    axios.post(this.context.apiServer, {
      query: `mutation {
        logout {
          username
        }
      }`,
    }, { withCredentials: true })
      .then(res => {
        if (res.data.data.logout.username)
          return this.props.logout()

        addNotification(notifications.error)
        window.history.back()
      })
      .catch(err => handleError(err, "Failed to log out"))
  }


  render = () => {
    const data = new Proxy({}, {
      get: (target, name) =>
        target[name] || "",
    })

    const setProp = (prop, { target }) =>
      data[prop] = target.value

    return (
      <InnerLayout>
        <p className='uk-h2 uk-text-center'>
          {this.state.title}
        </p>
        <ul className="uk-subnav uk-subnav-pill uk-flex-center" data-uk-switcher={true}>
          <li className='uk-width-1-3@m uk-width-1-2@s uk-text-center'>
            <a className='a-button' href="/#" onClick={() => this.setState(loginState)}>
              {loginState.title}
            </a>
          </li>
          <li className='uk-width-1-3@m uk-width-1-2@s uk-text-center'>
            <a className='a-button' href="/#" onClick={() => this.setState(signUpState)}>
              {signUpState.title}
            </a>
          </li>
        </ul>
        <Form>
          <div className='uk-margin-medium'>
            <label>
              Username
              <input className='uk-input' onChange={e => setProp("username", e)}/>
            </label>
          </div>

          <div className='uk-margin-medium'>
            <label>
              Password
              <input className='uk-input' type="password" onChange={e => setProp("password", e)}/>
            </label>
          </div>

          <button className='round-border uk-button uk-align-center uk-margin-remove-bottom uk-margin-large-top'
                  onClick={() => this.login(data)}>
            {this.state.title}
          </button>
        </Form>
      </InnerLayout>
    )
  }
}
