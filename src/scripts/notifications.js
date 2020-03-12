const notifications = [
  {
    name: "challengeCreated",
    value: {
      title: "New challenge!",
      message: "",
      type: "info",
    },
  },
  {
    name: "challengeStarted",
    value: {
      title: "Challenge started!",
      message: "",
      type: "info",
    },
  },
  {
    name: "challengeCompleted",
    value: {
      title: "Challenge completed!",
      message: "",
      type: "success",
    },
  },
  {
    name: "challengeDeleted",
    value: {
      title: "Challenge deleted",
      message: "",
      type: "danger",
    },
  },
  {
    name: "loginFailed",
    value: {
      title: "Login fail",
      message: "Wrong username or password",
      type: "danger",
    },
  },
]

module.exports = notifications
