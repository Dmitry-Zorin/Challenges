import React from "react"
import axios from "axios"
import { getChallenges } from "../scripts/functions"
import LazyComponent from "./lazy-component"

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authorized: false,
    }
  }

  componentDidMount() {
    if (!!localStorage.getItem('authorized'))
      return this.setState({ authorized: true })

    axios.post(this.props.data.apiServer, {
      query: `{
        user {
          authorized
        }
      }`,
    }).then(res => {
      if (!res.data.data.user.authorized)
        return this.props.navigate("/login")

      localStorage.setItem("authorized", "true")

      localStorage.getItem("challenges") ?
        this.setState({ authorized: true })
        : getChallenges(this.props.data.apiServer)
          .then(() => this.setState({ authorized: true }))
    })
  }

  render = () =>
    this.state.authorized &&
    <LazyComponent {...this.props}/>
}

export default Auth