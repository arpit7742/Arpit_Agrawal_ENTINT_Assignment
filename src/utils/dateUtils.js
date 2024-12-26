export const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }
  
  export const getDaysBetween = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000
    return Math.floor(Math.abs((new Date(date1) - new Date(date2)) / oneDay))
  }
  
  export const isOverdue = (lastCommunication, periodicity) => {
    if (!lastCommunication) return true
    const daysSince = getDaysBetween(new Date(), new Date(lastCommunication.date))
    return daysSince > periodicity
  }
  
  export const isDueToday = (lastCommunication, periodicity) => {
    if (!lastCommunication) return false
    const daysSince = getDaysBetween(new Date(), new Date(lastCommunication.date))
    return daysSince === periodicity
  }
  