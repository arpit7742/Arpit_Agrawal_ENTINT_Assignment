export const getCompanyStatus = (company) => {
    const lastComm = company.communications?.[0]
    if (isOverdue(lastComm, company.communicationPeriodicity)) return 'overdue'
    if (isDueToday(lastComm, company.communicationPeriodicity)) return 'due'
    return 'upcoming'
  }
  
  export const sortCompaniesByPriority = (companies) => {
    return [...companies].sort((a, b) => {
      const statusA = getCompanyStatus(a)
      const statusB = getCompanyStatus(b)
      const priorities = { overdue: 0, due: 1, upcoming: 2 }
      return priorities[statusA] - priorities[statusB]
    })
  }