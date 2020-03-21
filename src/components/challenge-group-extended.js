import React from "react"
import axios from "axios"
import { InnerLayout } from "./inner-layout"
import { Accordion, AccordionItem, Grid } from "uikit-react"
import { addNotification, getChallengeTime, handleError } from "../scripts/functions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp, faCheck, faEdit, faPlay, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { DataContext } from "../context/DataContext"
import { notifications } from "../data/notifications"
import { Loading } from "./loading"

export class ChallengeGroupExtended extends React.PureComponent {
  static contextType = DataContext

  constructor(props) {
    super(props)
    this.state = {
      pattern: /.*/,
    }
    this.search = this.search.bind(this)
  }

  search = ({ target }) => {
    this.setState({
      pattern: new RegExp(
        target.value.split(" ").join(".*"), "i"),
    })
  }

  render = () => {
    const groupName = window.location.pathname.slice(1)

    const options = {
      "ongoing": ["complete", "delete"],
      "upcoming": ["start", "delete"],
      "completed": ["delete"],
    }[groupName]

    const icon = {
      "ongoing": faArrowDown,
      "upcoming": faArrowUp,
      "completed": faCheck,
    }[groupName]

    const getLabelClass = c =>
      c.difficulty === "Hard" ? "uk-label-danger"
        : c.difficulty === "Medium" ? "uk-label-warning"
        : c.difficulty === "Easy" ? "uk-label-success"
          : "uk-label-info"

    const edit = challenge =>
      this.props.navigate("/edit", { state: { challenge } })

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
          {groupName[0].toUpperCase() + groupName.slice(1)}
        </p>
        <div className="uk-search uk-search-default uk-width-expand uk-margin-small">
          <span data-uk-search-icon={true}/>
          <input type="search" className="uk-search-input" placeholder="Search..." onChange={this.search}/>
        </div>
        {this.context.authorized === undefined ? <Loading/>
          :
          <Accordion>
            {(this.context.challenges[groupName] || [])
              .filter(c => this.state.pattern.test(c.name)).map(c =>
                <AccordionItem
                  key={c._id}
                  className='uk-margin-remove'
                  title={
                    <Grid>
                      <p className='uk-width-expand'>{c.name}</p>
                      <div className='uk-text-meta uk-padding-remove uk-text-right' style={{ marginTop: "0.35em" }}>
                        <FontAwesomeIcon icon={icon} transform='shrink-2'/>
                        {getChallengeTime(c)}
                      </div>
                    </Grid>
                  }
                  content={
                    <div>
                      <Grid className='uk-margin-remove'>
                        <div className={"label uk-label " + getLabelClass(c)}>
                          {c.difficulty}
                        </div>
                        <div className='uk-width-expand uk-text-right'>
                          <button className='button round-border uk-button uk-padding-remove'
                                  data-uk-tooltip='Edit' onClick={() => edit(c)}>
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
