import React from "react"
import { LazyComponent } from "./lazy-component"
import { Loading } from "./loading"
import { DataContext } from "../context/DataContext"
import { getChallenges } from "../scripts/functions"

export class Auth extends React.Component {
  static contextType = DataContext

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.authorize = this.authorize.bind(this)
  }

  authorize() {
    const stopLoading = () =>
      this.setState({ loading: false })

    localStorage.getItem("challenges") ? stopLoading()
      : getChallenges(this.context.apiServer).then(stopLoading)
  }

  render = () => {
    console.log(this.context.authorized)
    if (!this.context.authorized) {
      //this.props.navigate('/login')
      return null
    }

    if (this.state.loading) {
      this.authorize()
      return <Loading/>
    }

    return <LazyComponent {...this.props}/>
  }
}
