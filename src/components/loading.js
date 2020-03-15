import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export class Loading extends React.Component {
  constructor(props = null) {
    super(props)
    this.state = {
      render: false,
    }
  }

  componentDidMount() {
    this.timeout = setTimeout(
      () => this.setState({ render: true }),
      250,
    )
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render = () => this.state.render &&
    <p className='uk-text-center uk-width-expand uk-margin-large-top' style={{ color: "white" }}>
      <FontAwesomeIcon icon={faSpinner} transform='grow-8' pulse/>
    </p>
}
