import axios from "axios"
import { store } from "react-notifications-component"

export const getChallenges = api_server =>
  axios.post(api_server, {
    query: `{
      challenges {
        _id
        name
        difficulty
        progress
        startDate
        endDate
      }
    }`,
  })
    .then(res => {
      const challenges = sortChallenges(res.data.data.challenges)
      localStorage.setItem("challenges", JSON.stringify(challenges))
      return updateTime(challenges, api_server)
    })
    .catch(err => alert(err))

const sortChallenges = challenges => ({
  ongoing: challenges.filter(c => c.progress === "Ongoing")
    .sort((a, b) => a.endDate - b.endDate),

  upcoming: challenges.filter(c => c.progress === "Upcoming")
    .sort((a, b) => a.startDate - b.startDate),

  completed: challenges.filter(c => c.progress === "Completed")
    .sort((a, b) => b.endDate - a.endDate),
})

export const updateTime = (state, api_server) => {
  const date = new Date().getTime()
  let update = false

  const timeToString = t =>
    ((t = t / 60000) > 1440 ? `${t / 1440 | 0}d ` : "")
    + ((t %= 1440) > 60 ? `${t / 60 | 0}h ` : "")
    + (t < 1 ? "<1" : t % 60 | 0) + "m"

  const updatedState = {
    ...state.ongoing && {
      ongoing: state.ongoing.map(c => {
        const time = c.endDate - date
        if (time < 0) {
          update = true
          addNotification({
            title: "Challenge completed!",
            message: c.name,
            type: "success",
          })
        }
        c.timeLeft = timeToString(time)
        return c
      }),
    },
    ...state.upcoming && {
      upcoming: state.upcoming.map(c => {
        const time = c.startDate - date
        if (time < 0) {
          update = true
          addNotification({
            title: "Challenge started!",
            message: c.name,
          })
        }
        c.startsIn = timeToString(time)
        return c
      }),
    },
    ...state.completed && { completed: state.completed },
  }
  return new Promise(resolve =>
    !update ? resolve(updatedState)
      : getChallenges(api_server)
        .then(res => resolve(res)))
}

export const getChallengeName = c =>
  c.progress === "Ongoing" ? `${c.name} (${c.timeLeft} left)`
    : c.progress === "Upcoming" ? `${c.name} (starts in ${c.startsIn})`
    : c.name

export const addNotification = settings =>
  store.addNotification({
    type: "info",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 3000,
    },
    ...settings,
  })