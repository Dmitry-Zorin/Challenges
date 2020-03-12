import React from "react"
import axios from "axios"
import { getChallenges } from "../scripts/functions"
import LazyComponent from "./lazy-component"

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
    }
  }

  componentDidMount() {
    axios.post(this.props.data.apiServer, {
      query: `{
        user {
          loggedIn
        }
      }`,
    }).then(res => {
      console.log(res.data)

      if (!res.data.data.user.loggedIn)
        return this.props.navigate("/login")

      localStorage.getItem("challenges") ?
        this.setState({ loggedIn: true })
        : getChallenges(this.props.data.apiServer)
          .then(() => this.setState({ loggedIn: true }))
    })
  }

  render = () =>
    this.state.loggedIn &&
    <LazyComponent {...this.props}/>
}

export default Auth