import React from "react"
import axios from "axios"
import { Form, Grid } from "uikit-react"
import { InnerLayout } from "./inner-layout"
import { addNotification, handleError } from "../scripts/functions"
import { DataContext } from "../context/DataContext"
import { notifications } from "../data/notifications"

export const Challenge = ({ navigate, location }) => {
  const context = React.useContext(DataContext)
  const challenge = location && location.state.challenge
  const data = {}

  const state = challenge ? {
    id: "$id: String!",
    id_var: "id: $id",
    api: "challengeEdit",
    navigate: () => window.history.back(),
    action: "Update",
    title: "Edit Challenge",
    active: ["Easy", "Medium", "Hard"].indexOf(challenge.difficulty),
    save: "Save",
  } : {
    id: "",
    id_var: "",
    api: "challengeAdd",
    navigate: () => navigate(".."),
    action: "Create",
    title: "New Challenge",
    active: 0,
    save: "Create Challenge",
  }

  const setProp = (prop, e) =>
    data[prop] = e.target.value || e.target.text

  const cancel = () => {
    window.history.back()
  }

  const save = () => {
    console.log(data)
    axios.post(context.apiServer, {
      query: `mutation(
        ${state.id}
        $name: String
        $difficulty: Difficulty
        $duration: Float
        $delay: Float
      ) {
        ${state.api}(
          ${state.id_var}
          challenge: {
            name: $name
            difficulty: $difficulty
            duration: $duration
            delay: $delay
          }
        ) {
          name
        }
      }`,
      variables: {
        id: challenge && challenge._id,
        name: data.name,
        difficulty: data.difficulty,
        duration: 24 * +(data.durationD || 0) + +(data.durationH || 0) + +(data.durationM || 0) / 60,
        delay: 24 * +(data.delayD || 0) + +(data.delayH || 0) + +(data.delayM || 0) / 60,
      },
    }, { withCredentials: true })
      .then(res => {
        context.updateChallenges()
        addNotification({
          ...notifications.challengeCreated,
          message: res.data.data[state.api].name,
        })
        state.navigate()
      })
      .catch(err => handleError(err, `Failed to ${state.action} challenge`))
  }

  return (
    <InnerLayout>
      <p className='uk-h2 uk-text-center'>
        {state.title}
      </p>
      <Form>
        <div className='uk-margin-medium'>
          <label>
            Name
            <input className='uk-input' onChange={e => setProp("name", e)}
                   placeholder={!challenge && "Challenge from " + new Date().toString()
                     .split(" ").slice(1, 5).join(" ").slice(0, -3)}
                   defaultValue={challenge && challenge.name}/>
          </label>
        </div>

        <div className='uk-margin-medium'>
          Difficulty
          <ul className="uk-subnav uk-subnav-pill" data-uk-switcher={true} data-active={state.active}>
            <li className='uk-width-1-3 uk-text-center'>
              <a className='a-button' href="/#" onClick={e => setProp("difficulty", e)}>
                Easy
              </a>
            </li>
            <li className='uk-width-1-3 uk-text-center'>
              <a className='a-button' href="/#" onClick={e => setProp("difficulty", e)}>
                Medium
              </a>
            </li>
            <li className='uk-width-1-3 uk-text-center'>
              <a className='a-button' href="/#" onClick={e => setProp("difficulty", e)}>
                Hard
              </a>
            </li>
          </ul>
        </div>

        <div className='uk-margin-medium'>
          <Grid>
            <label className='uk-width-1-3'>
              Duration
              <input type='number' className='uk-input' placeholder='days' onChange={e => setProp("durationD", e)}/>
            </label>
            <label className='uk-width-1-3'>
              Duration
              <input type='number' className='uk-input' placeholder='hours' min='-23' max='23'
                     onChange={e => setProp("durationH", e)}/>
            </label>
            <label className='uk-width-1-3'>
              Duration
              <input type='number' className='uk-input' placeholder='minutes' step='10' min='-60' max='60'
                     onChange={e => setProp("durationM", e)}/>
            </label>
          </Grid>
        </div>

        <div className='uk-margin-medium'>
          <Grid>
            <label className='uk-width-1-3'>
              Delay
              <input type='number' className='uk-input' placeholder='days' onChange={e => setProp("delayD", e)}/>
            </label>
            <label className='uk-width-1-3'>
              Delay
              <input type='number' className='uk-input' placeholder='hours' min='-23' max='23'
                     onChange={e => setProp("delayH", e)}/>
            </label>
            <label className='uk-width-1-3'>
              Delay
              <input type='number' className='uk-input' placeholder='minutes' step='10' min='-60' max='60'
                     onChange={e => setProp("delayM", e)}/>
            </label>
          </Grid>
        </div>

        <Grid className='uk-flex-center uk-margin-large-top'>
          {challenge &&
          <div className='uk-width-1-3'>
            <button className='round-border uk-button uk-width-expand' onClick={cancel}>
              Cancel
            </button>
          </div>
          }
          <div className='uk-width-1-3'>
            <button className='round-border uk-button uk-width-expand' onClick={save}>
              {state.save}
            </button>
          </div>
        </Grid>
      </Form>
    </InnerLayout>
  )
}
