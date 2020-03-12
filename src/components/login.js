import React, { useEffect } from "react"
import axios from "axios"
import { Form } from "uikit-react"
import InnerLayout from "./inner-layout"

const Login = props => {
  let usernameInput
  const data = new Proxy({}, {
    get: (target, name) =>
      target[name] || "",
  })
  const signedUp = true

  useEffect(() =>
    usernameInput.focus())

  const setProp = (prop, e) =>
    data[prop] = e.target.value || data[prop]

  const login = (signedUp) => {
    axios.post(props.data.apiServer, {
      query: `mutation(
        $username: String!,
        $password: String!,
      ) {
        ${signedUp ? "login" : "signUp"}(
          username: $username, 
          password: $password,
        ) {
          username
        }
      }`,
      variables: {
        username: "dima", //data.username,
        password: "zorin", //data.password,
      },
    })
      .then(res => {
        if (signedUp) {
          const username = res.data.data.login.username
          username ? props.navigate("..") : alert("wrong!")
        } else {
          const username = res.data.data.signUp.username
          username ? props.navigate("..") : alert("wrong!")
        }
      })
      .catch(err => alert(err))
  }

  return (
    <InnerLayout>
      <p className='uk-h2 uk-text-center'>
        Login
      </p>
      <Form>
        <div className='uk-margin-medium'>
          <label>
            Username
            <input className='uk-input' ref={e => usernameInput = e} onChange={e => setProp("username", e)}/>
          </label>
        </div>

        <div className='uk-margin-medium'>
          <label>
            Password
            <input className='uk-input' type="password" onChange={e => setProp("password", e)}/>
          </label>
        </div>

        <button className='round-border uk-button uk-align-center uk-margin-remove-bottom uk-margin-large-top'
                onClick={() => login(signedUp)}>
          Log in
        </button>
      </Form>
    </InnerLayout>
  )
}

export default Login
