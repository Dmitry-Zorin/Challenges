import React from "react"
import axios from "axios"
import { InnerLayout } from "./inner-layout"
import { Accordion, AccordionItem, Grid } from "uikit-react"
import { addNotification, getChallengeTime, handleError } from "../scripts/functions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEdit, faPlay, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { DataContext } from "../context/DataContext"
import { notifications } from "../data/notifications"
import { Loading } from "./loading"

export class ChallengeGroupExtended extends React.Component {
  static contextType = DataContext

  constructor(props) {
    super(props)
    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)

    this.state = {
      input: "",
    }
    this.groupName = window.location.pathname.slice(1)
  }

  edit(c) {
    if (typeof c.name !== "string")
      return

    this.setState({
      input: c._id,
    })

    document.querySelectorAll(".uk-accordion-title")
      .forEach(e => e.href = "")
  }

  save(id, name) {
    this.setState({
      input: "",
    })

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
      .then(this.context.updateChallenges)
      .catch(err => handleError(err, "Failed to edit challenge"))
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

    const update = (challenge, action) => {
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
          this.context.updateChallenges()
          addNotification({
            ...action === "Start" ? notifications.challengeStarted
              : action === "Complete" ? notifications.challengeCompleted
                : notifications.challengeDeleted,
            message: challenge.name,
          })
        })
        .catch(err => handleError(err, `Failed to ${action.toLowerCase()} challenge`))
    }

    return (
      <InnerLayout>
        <p className='uk-h2 uk-text-center' autoCapitalize='on'>
          {this.groupName[0].toUpperCase() + this.groupName.slice(1)}
        </p>
        {this.context.authorized === undefined ? <Loading/>
          :
          <Accordion>
            {(this.context.challenges[this.groupName] || []).map(c =>
              <AccordionItem
                key={c._id}
                className='uk-margin-remove'
                title={this.state.input !== c._id
                  ?
                  <div>
                    <span>{c.name}</span>
                    <span className='uk-text-meta'>
                      {getChallengeTime(c)}
                    </span>
                  </div>
                  :
                  <input
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    className='uk-input uk-width-auto' autoFocus defaultValue={c.name}
                    onKeyDown={e => /Enter|Esc/.test(e.key) && this.save(c._id, e.target.value)}
                    onBlur={e => this.save(c._id, e.target.value)}
                  />
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

                        {options.includes("start") &&
                        <button className='button round-border uk-button uk-padding-remove'
                                data-uk-tooltip='Start' onClick={() => update(c, "Start")}>
                          <FontAwesomeIcon icon={faPlay} transform='grow-3'/>
                        </button>
                        }

                        {options.includes("complete") &&
                        <button className='button round-border uk-button uk-padding-remove'
                                data-uk-tooltip='Complete' onClick={() => update(c, "Complete")}>
                          <FontAwesomeIcon icon={faCheck} transform='grow-3'/>
                        </button>
                        }

                        {options.includes("delete") &&
                        <button className='button round-border uk-button uk-padding-remove'
                                data-uk-tooltip='Delete' onClick={() => update(c, "Delete")}>
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
        }
      </InnerLayout>
    )
  }
}
