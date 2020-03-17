import React from "react"
import axios from "axios"
import { Form, Grid } from "uikit-react"
import { InnerLayout } from "./inner-layout"
import { addNotification, handleError } from "../scripts/functions"
import { DataContext } from "../context/DataContext"
import { notifications } from "../data/notifications"

export const Challenge = ({ navigate }) => {
  const context = React.useContext(DataContext)

  const data = new Proxy({}, {
    get: (target, name) =>
      target[name] || "",
  })

  const defaultName = "Challenge from " + new Date().toString()
    .split(" ").slice(1, 5).join(" ").slice(0, -3)

  const setProp = (prop, e) =>
    data[prop] = e.target.value// || data[prop]

  const createChallenge = () => {
    axios.post(context.apiServer, {
      query: `mutation(
        $username: String!,
        $name: String,
        $difficulty: Difficulty,
        $duration: Float,
        $delay: Float,
      ) {
        challengeAdd(
          challenge: {
            username: $username,
            name: $name,
            difficulty: $difficulty,
            duration: $duration,
            delay: $delay,
          }
        ) {
          name
        }
      }`,
      variables: {
        username: "dima",
        name: data.name,
        difficulty: data.difficulty || "Easy",
        duration: 24 * +data.durationD + +data.durationH + +data.durationM / 60,
        delay: 24 * +data.delayD + +data.delayH + +data.delayM / 60,
      },
    }, { withCredentials: true })
      .then(res => {
        context.updateChallenges()
        addNotification({
          ...notifications.challengeCreated,
          message: res.data.data.challengeAdd.name,
        })
        navigate("..")
      })
      .catch(err => handleError(err, "Failed to create challenge"))
  }

  return (
    <InnerLayout>
      <p className='uk-h2 uk-text-center'>
        New Challenge
      </p>
      <Form>
        <div className='uk-margin-medium'>
          <label>
            Name
            <input className='uk-input' onChange={e => setProp("name", e)} placeholder={defaultName}/>
          </label>
        </div>

        <div className='uk-margin-medium'>
          Difficulty
          <ul className="uk-subnav uk-subnav-pill" data-uk-switcher={true}>
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

        <button className='round-border uk-button uk-align-center uk-margin-remove-bottom uk-margin-large-top'
                onClick={createChallenge}>
          Create Challenge
        </button>
      </Form>
    </InnerLayout>
  )
}
