import React from "react"
import axios from "axios"
import { Form } from "uikit-react"
import { InnerLayout } from "../inner-layout"
import { addNotification, handleError } from "../../scripts/functions"
import { DataContext } from "../../context/DataContext"
import { notifications } from "../../data/notifications"
import { DifficultyInput } from "./difficulty-input"
import { TimeInput } from "./time-input"
import { Buttons } from "./buttons"
import { TextInput } from "../text-input"

const info = {
  create: {
    api: "challengeAdd",
    notification: "challengeCreated",
    action: "Create",
    title: "New Challenge",
    save: "Create Challenge",
  },
  edit: {
    id: "$id: String!",
    id_var: "id: $id",
    api: "challengeEdit",
    notification: "challengeEdited",
    action: "Update",
    title: "Edit Challenge",
    save: "Save",
  }
}

const getQuery = info =>
  `mutation(
    ${info.id || ""}
    $name: String!
    $difficulty: Difficulty
    $startDate: Float
    $endDate: Float
  ) {
    ${info.api}(
      ${info.id_var || ""}
      challenge: {
        name: $name
        difficulty: $difficulty
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      name
    }
  }`

export class Challenge extends React.Component {
  static contextType = DataContext

  constructor(props) {
    super(props)
    this.getChallenge = this.getChallenge.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.save = this.save.bind(this)

    this.state = {
      ...this.getChallenge(),
    }

    this.info = !this.state._id ? {
      ...info.create,
      navigate: () => props.navigate(".."),
    } : {
      ...info.edit,
      navigate: () => window.history.back(),
    }
  }

  getChallenge() {
    const c = this.props.location.state.challenge
    if (!c) return

    const now = new Date().getTime()
    c.duration = Math.max(0, c.endDate - Math.max(c.startDate, now))
    c.delay = Math.max(0, c.startDate - now)
    return c
  }

  handleChange(name, value) {
    this.setState({ [name]: value })
  }

  save(defaultName) {
    const startDate = new Date().getTime() + (this.state.delay || 0)
    const endDate = startDate + (this.state.duration || 0)

    axios.post(
      this.context.apiServer,
      {
        query: getQuery(this.info),
        variables: {
          id: this.state._id,
          name: this.state.name || defaultName,
          difficulty: this.state.difficulty,
          startDate, endDate,
        },
      },
      { withCredentials: true },
    )
      .then(res => {
        this.context.updateChallenges()
        addNotification({
          ...notifications[this.info.notification],
          message: res.data.data[this.info.api].name,
        })
        this.info.navigate()
      })
      .catch(err => handleError(err, `Failed to ${this.info.action} challenge`))
  }

  render = () => {
    const defaultName = "Challenge from " + new Date().toString()
      .split(" ").slice(1, 5).join(" ").slice(0, -3)

    return (
      <InnerLayout>
        <p className='uk-h2 uk-text-center'>
          {this.info.title}
        </p>
        <Form>
          <TextInput label='name' value={this.state.name} defaultValue={defaultName} handleChange={this.handleChange}/>
          <DifficultyInput difficulty={this.state.difficulty} handleChange={this.handleChange}/>
          <TimeInput name='duration' ms={this.state.duration} handleChange={this.handleChange}/>
          <TimeInput name='delay' ms={this.state.delay} handleChange={this.handleChange}/>
          <Buttons save={() => this.save(defaultName)} saveValue={this.info.save} showCancel={!!this.state._id}/>
        </Form>
      </InnerLayout>
    )
  }
}
