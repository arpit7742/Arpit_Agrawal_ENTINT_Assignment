import { useCallback, useMemo } from 'react'
import { useCompanyContext } from '../context/CompanyContext'
import { isOverdue, isDueToday } from '../utils/dateUtils'

export const useCompanies = () => {
  const { 
    companies, 
    communicationMethods,
    addCompany, 
    updateCompany, 
    deleteCompany, 
    logCommunication 
  } = useCompanyContext()

  const overdueCompanies = useMemo(() => 
    companies.filter(company => {
      const lastComm = company.communications?.[0]
      return isOverdue(lastComm, company.communicationPeriodicity)
    }), [companies]
  )

  const dueTodayCompanies = useMemo(() => 
    companies.filter(company => {
      const lastComm = company.communications?.[0]
      return isDueToday(lastComm, company.communicationPeriodicity)
    }), [companies]
  )

  const handleCommunication = useCallback((companyId, communicationType, notes) => {
    const communication = {
      id: Date.now(),
      type: communicationType,
      date: new Date().toISOString(),
      notes
    }
    logCommunication(companyId, communication)
  }, [logCommunication])

  return {
    companies,
    communicationMethods,
    overdueCompanies,
    dueTodayCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
    handleCommunication
  }
}

export default useCompanies