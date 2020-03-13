import React from "react"
import axios from "axios"
import { Form } from "uikit-react"
import InnerLayout from "./inner-layout"
import { addNotification } from "../scripts/functions"
import { navigate } from "@reach/router"

const loginState = {
  login: true,
  action: "Log In",
}

const signUpState = {
  login: false,
  action: "Sign Up",
}

class Login extends React.Component {
  constructor(props) {
    super(props || null)
    this.state = loginState
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    if (this.props.auth)
      this.logout()
  }

  login(data) {
    axios.post(this.props.data.apiServer, {
      query: `mutation(
        $username: String!,
        $password: String!,
      ) {
        ${this.state.login ? "login" : "signUp"}(
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
    }, {
      withCredentials: true,
    })
      .then(res => {
        if (this.state.login) {
          if (!res.data.data.login.username)
            return addNotification(this.props.data.getNotification("loginFailed"))
        } else {
          if (!res.data.data.signUp.username)
            return addNotification(this.props.data.getNotification("error"))
        }
        this.props.login()
        navigate(-1)
      })
      .catch(err => alert(err))
  }

  logout() {
    axios.post(this.props.data.apiServer, {
      query: `mutation {
        logout {
          username
        }
      }`,
    }, {
      withCredentials: true,
    })
      .then(res => {
        if (res.data.data.logout.username) {
          localStorage.clear()
          return this.props.logout()
        }

        addNotification(this.props.data.getNotification("error"))
        navigate(-1)
      })
      .catch(err => alert(err))
  }


  render = () => {
    const data = new Proxy({}, {
      get: (target, name) =>
        target[name] || "",
    })

    const setProp = (prop, e) =>
      data[prop] = e.target.value// || data[prop]

    return (
      <InnerLayout>
        <p className='uk-h2 uk-text-center'>
          {this.state.action}
        </p>
        <ul className="uk-subnav uk-subnav-pill uk-flex-center" data-uk-switcher={true}>
          <li className='uk-width-1-3@m uk-width-1-2@s uk-text-center'>
            <a className='a-button' href="/#" onClick={() => this.setState(loginState)}>
              {loginState.action}
            </a>
          </li>
          <li className='uk-width-1-3@m uk-width-1-2@s uk-text-center'>
            <a className='a-button' href="/#" onClick={() => this.setState(signUpState)}>
              {signUpState.action}
            </a>
          </li>
        </ul>
        <Form>
          <div className='uk-margin-medium'>
            <label>
              Username
              {/* eslint-disable-next-line jsx-a11y/no-autofocus*/}
              <input className='uk-input' autoFocus onChange={e => setProp("username", e)}/>
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
            {this.state.action}
          </button>
        </Form>
      </InnerLayout>
    )
  }
}

export default Login
