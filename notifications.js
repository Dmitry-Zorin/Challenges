const notifications = [
  {
    name: "challengeCreated",
    value: {
      title: "New challenge!",
      type: "info",
    },
  },
  {
    name: "challengeStarted",
    value: {
      title: "Challenge started!",
      type: "info",
    },
  },
  {
    name: "challengeCompleted",
    value: {
      title: "Challenge completed!",
      type: "success",
    },
  },
  {
    name: "challengeDeleted",
    value: {
      title: "Challenge deleted",
      type: "danger",
    },
  },
]

module.exports = notifications
