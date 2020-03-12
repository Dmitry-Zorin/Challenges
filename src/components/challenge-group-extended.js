import React from "react"
import InnerLayout from "./inner-layout"
import axios from "axios"
import { Accordion, AccordionItem, Grid } from "uikit-react"
import { addNotification, getChallengeName, getChallenges, updateTime } from "../scripts/functions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEdit, faPlay, faTrashAlt } from "@fortawesome/free-solid-svg-icons"

class ChallengeGroupExtended extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupName: props.location.pathname.slice(1),
      group: [],
      titles: {},
    }
    this.updateState = this.updateState.bind(this)
    this.initState = this.initState.bind(this)
    this.update = this.update.bind(this)
    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.updateState, this.props.data.timeout)
    this.updateState(JSON.parse(
      localStorage.getItem("challenges"),
    ))
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  updateState(state) {
    updateTime({
      [this.state.groupName]: state ? state[this.state.groupName] : this.state.group,
    }, this.props.data.apiServer)
      .then(res => this.initState(res))
  }

  initState(state) {
    const group = state[this.state.groupName]
    this.setState({
      group: group,
      titles: group.reduce((d, c) => {
        d[c._id] = getChallengeName(c)
        return d
      }, {}),
    })
  }

  update(challenge, action) {
    axios.post(this.props.data.apiServer, {
      query: `mutation(
        $id: String!
      ) {
        challenge${action}(
          id: $id
        )
      }`,
      variables: {
        id: challenge._id,
      },
    })
      .then(() => {
        const d = this.props.data
        addNotification({
          ...action === "Start" ? d.getNotification("challengeStarted")
            : action === "Complete" ? d.getNotification("challengeCompleted")
              : d.getNotification("challengeDeleted"),
          message: challenge.name,
        })
        getChallenges(this.props.data.apiServer)
          .then(res => this.initState(res))
      })
      .catch(err => alert(err))
  }

  edit(id) {
    if (typeof this.state.titles[id] !== "string")
      return

    clearInterval(this.interval)
    document.querySelectorAll(".uk-accordion-title")
      .forEach(e => e.href = "")

    this.setState({
      titles: {
        ...this.state.titles,
        [id]:
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            className='uk-input uk-width-auto' autoFocus
            defaultValue={this.state.titles[id].match(/([^(]*)(?= \(|$)/)[0]}
            onKeyDown={e => /Enter|Esc/.test(e.key) && this.save(id, e.target.value)}
            onBlur={e => this.save(id, e.target.value)}
          />,
      },
    })
  }

  save(id, name) {
    this.interval = setInterval(this.updateState, this.props.data.timeout)
    document.querySelectorAll(".uk-accordion-title")
      .forEach(e => e.href = "#")

    axios.post(this.props.data.apiServer, {
      query: `mutation(
        $id: String!
        $name: String!
      ) {
        challengeEdit(
          id: $id
          name: $name
        ) {
          name
        }
      }`,
      variables: {
        id: id,
        name: name,
      },
    })
      .then(() => getChallenges(this.props.data.apiServer)
        .then(res => this.initState(res)))
      .catch(err => console.log(err))
  }

  render = () => {
    const options = {
      "ongoing": ["complete", "delete"],
      "upcoming": ["start", "delete"],
      "completed": ["delete"],
    }[this.state.groupName]

    const getLabelClass = c =>
      c.difficulty === "Hard" ? "uk-label-danger"
        : c.difficulty === "Medium" ? "uk-label-warning"
        : c.difficulty === "Easy" ? "uk-label-success"
          : "uk-label-info"

    return (
      <InnerLayout>
        <p className='uk-h2 uk-text-center' autoCapitalize='on'>
          {this.state.groupName}
        </p>
        <Accordion>
          {this.state.group.map(c =>
            <AccordionItem
              key={c._id}
              className='uk-margin-remove'
              title={this.state.titles[c._id]}
              content={
                <div>
                  <Grid className='uk-margin-remove'>
                    <div className={"label uk-label " + getLabelClass(c)}>
                      {c.difficulty}
                    </div>
                    <div className='uk-width-expand uk-text-right'>
                      <button className='button round-border uk-button uk-padding-remove'
                              data-uk-tooltip='Edit' onClick={() => this.edit(c._id)}>
                        <FontAwesomeIcon icon={faEdit} transform='grow-3'/>
                      </button>

                      {
                        options.includes("start") &&
                        <button className='button round-border uk-button uk-padding-remove'
                                data-uk-tooltip='Start' onClick={() => this.update(c, "Start")}>
                          <FontAwesomeIcon icon={faPlay} transform='grow-3'/>
                        </button>
                      }

                      {
                        options.includes("complete") &&
                        <button className='button round-border uk-button uk-padding-remove'
                                data-uk-tooltip='Complete' onClick={() => this.update(c, "Complete")}>
                          <FontAwesomeIcon icon={faCheck} transform='grow-3'/>
                        </button>
                      }

                      {
                        options.includes("delete") &&
                        <button className='button round-border uk-button uk-padding-remove'
                                data-uk-tooltip='Delete' onClick={() => this.update(c, "Delete")}>
                          <FontAwesomeIcon icon={faTrashAlt} transform='grow-3'/>
                        </button>
                      }
                    </div>
                  </Grid>
                  <hr/>
                </div>
              }
            />,
          )}
        </Accordion>
      </InnerLayout>
    )
  }
}

export default ChallengeGroupExtended
