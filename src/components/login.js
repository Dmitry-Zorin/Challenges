import React from "react"
import axios from "axios"
import { Form } from "uikit-react"
import InnerLayout from "./inner-layout"
import { addNotification } from "../scripts/functions"
import { navigate } from "@reach/router"

class Login extends React.Component {
  constructor(props) {
    super(props || null)
    this.state = {
      login: true,
      action: "Log In",
    }
    this.switch = this.switch.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    if (this.props.auth)
      this.logout()
  }

  switch() {
    this.setState(
      this.state.login ? {
        login: false,
        action: "Sign Up",
      } : {
        login: true,
        action: "Log In",
      },
    )
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
    })
      .then(res => {
        if (this.state.login) {
          if (!res.data.data.login.username)
            return addNotification(this.props.data.getNotification("loginFailed"))

          this.props.login()
          navigate(-1)
        } else {
          res.data.data.signUp.username
            ? navigate(-1) : alert("wrong!")
        }
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
    })
      .then(res => {
        console.log(res)
        if (res.data.data.logout.username)
          return this.props.logout()

        addNotification(this.props.data.getNotification("loginFailed"))
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
      data[prop] = e.target.value || data[prop]

    return (
      <InnerLayout>
        <p className='uk-h2 uk-text-center'>
          {this.state.action}
        </p>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions*/}
        <ul className="uk-subnav uk-subnav-pill uk-flex-center" data-uk-switcher={true} onClick={this.switch}>
          <li className='uk-width-1-3@m uk-width-1-2@s uk-text-center'>
            <a className='a-button' href="/#">
              Log In
            </a>
          </li>
          <li className='uk-width-1-3@m uk-width-1-2@s uk-text-center'>
            <a className='a-button' href="/#">
              Sign Up
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
