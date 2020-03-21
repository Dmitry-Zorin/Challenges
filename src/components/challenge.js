import React from "react"
import axios from "axios"
import { Form, Grid } from "uikit-react"
import { InnerLayout } from "./inner-layout"
import { addNotification, handleError } from "../scripts/functions"
import { DataContext } from "../context/DataContext"
import { notifications } from "../data/notifications"

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
      id: "",
      id_var: "",
      api: "challengeAdd",
      notification: "challengeCreated",
      navigate: () => props.navigate(".."),
      action: "Create",
      title: "New Challenge",
      save: "Create Challenge",
    } : {
      id: "$id: String!",
      id_var: "id: $id",
      api: "challengeEdit",
      notification: "challengeEdited",
      navigate: () => window.history.back(),
      action: "Update",
      title: "Edit Challenge",
      save: "Save",
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
    this.setState({
      [name]: value,
    })
  }

  save(defaultName) {
    const startDate = new Date().getTime() + (this.state.delay || 0)
    const endDate = startDate + (this.state.duration || 0)

    axios.post(this.context.apiServer, {
      query: `mutation(
        ${this.info.id}
        $name: String!
        $difficulty: Difficulty
        $startDate: Float
        $endDate: Float
      ) {
        ${this.info.api}(
          ${this.info.id_var}
          challenge: {
            name: $name
            difficulty: $difficulty
            startDate: $startDate
            endDate: $endDate
          }
        ) {
          name
        }
      }`,
      variables: {
        id: this.state._id,
        name: this.state.name || defaultName,
        difficulty: this.state.difficulty,
        startDate, endDate,
      },
    }, { withCredentials: true })
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
        <p className='uk-h2 uk-text-center'>{this.info.title}</p>
        <Form>
          <NameInput value={this.state.name} defaultName={defaultName} handleChange={this.handleChange}/>
          <DifficultyInput difficulty={this.state.difficulty} handleChange={this.handleChange}/>
          <TimeInput name='duration' ms={this.state.duration} handleChange={this.handleChange}/>
          <TimeInput name='delay' ms={this.state.delay} handleChange={this.handleChange}/>
          <Buttons save={() => this.save(defaultName)} saveValue={this.info.save} cancel={!!this.info.id}/>
        </Form>
      </InnerLayout>
    )
  }
}

const NameInput = ({ value, defaultName, handleChange }) => (
  <div className='uk-margin-medium'>
    <label>
      Name
      <input
        className='uk-input' value={value || ""} placeholder={value ? undefined : defaultName}
        onChange={e => handleChange("name", e.target.value)}
      />
    </label>
  </div>
)

const DifficultyInput = ({ difficulty, handleChange }) => {
  const difficulties = ["Easy", "Medium", "Hard"]
  const widthClass = `uk-child-width-1-${difficulties.length}`
  const active = difficulties.indexOf(difficulty)

  return (
    <div className='uk-margin-medium'>
      Difficulty
      <ul className={"uk-subnav uk-subnav-pill " + widthClass} data-uk-switcher={true} data-active={active}>
        {difficulties.map(d => <Item key={d} difficulty={d} handleChange={handleChange}/>)}
      </ul>
    </div>
  )
}

const Item = ({ difficulty, handleChange }) => (
  <li className='uk-text-center'>
    <a className='a-button' href="/#" onClick={() => handleChange("difficulty", difficulty)}>
      {difficulty}
    </a>
  </li>
)

const TimeInput = ({ name, ms = 0, handleChange }) => (
  <div className='uk-margin-medium'>
    {name[0].toUpperCase() + name.slice(1)}
    <Grid>
      <NumberInput name={name} type='days' ms={ms} handleChange={handleChange}/>
      <NumberInput name={name} type='hours' ms={ms} handleChange={handleChange}/>
      <NumberInput name={name} type='minutes' ms={ms} handleChange={handleChange} step={10}/>
    </Grid>
  </div>
)

const NumberInput = ({ name, type, ms, handleChange, step }) => {
  const msInDay = 864e5
  const msInHour = 36e5
  const msInMinute = 6e4

  const time = {
    days: ms / msInDay | 0,
    hours: ms % msInDay / msInHour | 0,
    minutes: ms % msInHour / msInMinute | 0,
  }[type]

  const toMs = {
    days: msInDay,
    hours: msInHour,
    minutes: msInMinute,
  }[type]

  return (
    <label className='uk-width-1-3 uk-text-right'>
      {type}
      <input
        type='number' className='uk-input' value={time || ""} placeholder={time ? undefined : 0} step={step}
        onChange={e => handleChange(name, ms + (e.target.value - time) * toMs)}
      />
    </label>
  )
}

const Buttons = ({ save, saveValue, cancel }) => (
  <Grid className='uk-flex-center uk-margin-large-top uk-child-width-1-3'>
    {cancel &&
    <Button value='Cancel' onClick={() => window.history.back()}/>
    }
    <Button value={saveValue} onClick={save}/>
  </Grid>
)

const Button = ({ value, onClick }) => (
  <div>
    <button className="round-border uk-button uk-width-expand" onClick={onClick}>
      {value}
    </button>
  </div>
)
