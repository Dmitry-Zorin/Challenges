class Data {
  constructor(obj) {
    Object.assign(this, obj)
  }
}

Data.prototype.getNotification = function(name) {
  try {
    return this.notifications.find(e => e.name === name).value
  } catch (e) {
    return ""
  }
}

export default Data
