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

const challenges = {
  ongoing: {
    options: ["complete", "delete"],
    icon: faArrowDown,
  },
  upcoming: {
    options: ["start", "delete"],
    icon: faArrowUp,
  },
  completed: {
    options: ["delete"],
    icon: faCheck,
  },
}

const labelClasses = {
  "Easy": "uk-label-success",
  "Medium": "uk-label-warning",
  "Hard": "uk-label-danger",
}

export class ChallengeGroupExtended extends React.PureComponent {
  static contextType = DataContext

  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
    this.edit = this.edit.bind(this)
    this.update = this.update.bind(this)

    this.state = { pattern: /.*/ }
    this.groupName = window.location.pathname.slice(1)
  }

  search({ target }) {
    this.setState({
      pattern: new RegExp(target.value.split(" ").join(".*"), "i"),
    })
  }

  edit(challenge) {
    this.props.navigate("/edit", { state: { challenge } })
  }

  update(challenge, action) {
    axios.post(this.context.apiServer,
      {
        query: `mutation(
          $id: String!
        ) {
          challenge${action}(
            id: $id
          )
        }`,
        variables: { id: challenge._id },
      },
      { withCredentials: true },
    )
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

  render = () => {
    const options = challenges[this.groupName].options

    return (
      <InnerLayout>
        <p className='uk-h2 uk-text-center'>
          {this.groupName[0].toUpperCase() + this.groupName.slice(1)}
        </p>
        <div className="uk-search uk-search-default uk-width-expand uk-margin-small">
          <span data-uk-search-icon={true}/>
          <input type="search" className="uk-search-input" placeholder="Search..." onChange={this.search}/>
        </div>
        {this.context.isAuthorized === undefined ? <Loading/>
          :
          <Accordion>
            {(this.context.challenges[this.groupName] || [])
              .filter(c => this.state.pattern.test(c.name)).map(c =>
                <AccordionItem
                  key={c._id}
                  className='uk-margin-remove'
                  title={
                    <Grid>
                      <p className='uk-width-expand'>{c.name}</p>
                      <div className='uk-text-meta uk-padding-remove uk-text-right' style={{ marginTop: "0.35em" }}>
                        <FontAwesomeIcon icon={challenges[this.groupName].icon} transform='shrink-2'/>
                        {getChallengeTime(c)}
                      </div>
                    </Grid>
                  }
                  content={
                    <div>
                      <Grid className='uk-margin-remove'>
                        <div className={"label uk-label " + labelClasses[c.difficulty]}>
                          {c.difficulty}
                        </div>
                        <div className='uk-width-expand uk-text-right'>
                          <Button icon={faEdit} tooltip='Edit' onClick={() => this.edit(c)}/>

                          {options.includes("start") &&
                          <Button icon={faPlay} tooltip='Start' onClick={() => this.update(c, "Start")}/>
                          }

                          {options.includes("complete") &&
                          <Button icon={faCheck} tooltip='Complete' onClick={() => this.update(c, "Complete")}/>
                          }

                          {options.includes("delete") &&
                          <Button icon={faTrashAlt} tooltip='Delete' onClick={() => this.update(c, "Delete")}/>
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

const Button = ({ icon, tooltip, onClick }) => (
  <button className='button uk-button uk-padding-remove' data-uk-tooltip={tooltip} onClick={onClick}>
    <FontAwesomeIcon icon={icon} transform='grow-3'/>
  </button>
)
