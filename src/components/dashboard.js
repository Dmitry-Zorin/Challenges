import React from "react"
import { Flex } from "uikit-react"
import ChallengeGroup from "./challenge-group"
import { updateTime } from "../scripts/functions"
import LeftColumn from "./left-column"
import NewChallengeButton from "./new-challenge-button"

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ongoing: [],
      upcoming: [],
      completed: [],
    }
    this.updateState = this.updateState.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.updateState, this.props.data.timeout)
    this.updateState(JSON.parse(
      localStorage.getItem("challenges")
    ))
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  updateState(state = this.state) {
    updateTime(state, this.props.data.apiServer)
      .then(res => this.setState({
        ...state,
        ...res,
      }))
  }

  render = () =>
    <Flex>
      <LeftColumn/>
      <div className='uk-width-expand uk-padding-remove-left'>
        <NewChallengeButton/>
        <ChallengeGroup to='/ongoing' title='Ongoing' group={this.state.ongoing}/>
        <ChallengeGroup to='/upcoming' title='Upcoming' group={this.state.upcoming}/>
        <ChallengeGroup to='/completed' title='Completed' group={this.state.completed}/>
      </div>
    </Flex>
}

export default Dashboard
