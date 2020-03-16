import React from "react"
import axios from "axios"
import { InnerLayout } from "./inner-layout"
import { Accordion, AccordionItem, Grid } from "uikit-react"
import { addNotification, getChallengeTime, getChallenges, updateTime } from "../scripts/functions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEdit, faPlay, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { DataContext } from "../context/DataContext"
import { notifications } from "../data/notifications"

export default class ChallengeGroupExtended extends React.Component {
  static contextType = DataContext

  constructor(props) {
    super(props)
    this.state = {
      group: [],
    }
    this.groupName = props.location.pathname.slice(1)
    this.updateState = this.updateState.bind(this)
    this.initState = this.initState.bind(this)
    this.update = this.update.bind(this)
    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.updateState, this.context.timeout)
    this.updateState(JSON.parse(
      localStorage.getItem("challenges"),
    ))
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  updateState(state) {
    updateTime({
      [this.groupName]: state ? state[this.groupName] : this.state.group,
    }, this.context.apiServer)
      .then(res => this.initState(res))
  }

  initState(state) {
    const group = state[this.groupName]
    this.setState({
      group: group,
    })
  }

  update(challenge, action) {
    axios.post(this.context.apiServer, {
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
    }, { withCredentials: true })
      .then(() => {
        addNotification({
          ...action === "Start" ? notifications.challengeStarted
            : action === "Complete" ? notifications.challengeCompleted
              : notifications.challengeDeleted,
          message: challenge.name,
        })
        getChallenges(this.context.apiServer)
          .then(res => this.initState(res))
      })
      .catch(err => alert(err))
  }

  edit(c) {
    if (typeof c.name !== "string")
      return

    clearInterval(this.interval)
    document.querySelectorAll(".uk-accordion-title")
      .forEach(e => e.href = "")

    this.setState({
      group: this.state.group.map(e => {
        if (e._id === c._id) e.name = (
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            className='uk-input uk-width-auto' autoFocus defaultValue={c.name}
            onKeyDown={e => /Enter|Esc/.test(e.key) && this.save(c._id, e.target.value)}
            onBlur={e => this.save(c._id, e.target.value)}
          />
        )
        return e
      }),
    })
  }

  save(id, name) {
    this.interval = setInterval(this.updateState, this.context.timeout)
    document.querySelectorAll(".uk-accordion-title")
      .forEach(e => e.href = "#")

    axios.post(this.context.apiServer, {
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
    }, { withCredentials: true })
      .then(() => getChallenges(this.context.apiServer)
        .then(res => this.initState(res)))
      .catch(err => console.log(err))
  }

  render = () => {
    const options = {
      "ongoing": ["complete", "delete"],
      "upcoming": ["start", "delete"],
      "completed": ["delete"],
    }[this.groupName]

    const getLabelClass = c =>
      c.difficulty === "Hard" ? "uk-label-danger"
        : c.difficulty === "Medium" ? "uk-label-warning"
        : c.difficulty === "Easy" ? "uk-label-success"
          : "uk-label-info"

    return (
      <InnerLayout>
        <p className='uk-h2 uk-text-center' autoCapitalize='on'>
          {this.groupName[0].toUpperCase() + this.groupName.slice(1)}
        </p>
        <Accordion>
          {this.state.group.map(c =>
            <AccordionItem
              key={c._id}
              className='uk-margin-remove'
              title={
                <div>
                  <span>
                    {c.name}
                  </span>
                  <span className='uk-text-meta'>
                    {getChallengeTime(c)}
                  </span>
                </div>
              }
              content={
                <div>
                  <Grid className='uk-margin-remove'>
                    <div className={"label uk-label " + getLabelClass(c)}>
                      {c.difficulty}
                    </div>
                    <div className='uk-width-expand uk-text-right'>
                      <button className='button round-border uk-button uk-padding-remove'
                              data-uk-tooltip='Edit' onClick={() => this.edit(c)}>
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
