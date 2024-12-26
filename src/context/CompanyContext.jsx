import React, { createContext, useContext, useReducer } from 'react'
import { mockCompanies, mockCommunicationMethods } from '../data/mockData'

const CompanyContext = createContext()

const initialState = {
  companies: mockCompanies,
  communicationMethods: mockCommunicationMethods,
  notifications: []
}

const companyReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMPANY':
      return {
        ...state,
        companies: [...state.companies, { ...action.payload, id: Date.now() }]
      }
    case 'UPDATE_COMPANY':
      return {
        ...state,
        companies: state.companies.map(company =>
          company.id === action.payload.id 
            ? { ...company, ...action.payload.data }
            : company
        )
      }
    case 'DELETE_COMPANY':
      return {
        ...state,
        companies: state.companies.filter(company => company.id !== action.payload)
      }
    case 'LOG_COMMUNICATION':
      return {
        ...state,
        companies: state.companies.map(company =>
          company.id === action.payload.companyId
            ? {
                ...company,
                communications: [
                  action.payload.communication,
                  ...(company.communications || [])
                ]
              }
            : company
        )
      }
    default:
      return state
  }
}

export const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialState)

  const value = {
    ...state,
    addCompany: (company) => dispatch({ type: 'ADD_COMPANY', payload: company }),
    updateCompany: (id, data) => 
      dispatch({ type: 'UPDATE_COMPANY', payload: { id, data } }),
    deleteCompany: (id) => dispatch({ type: 'DELETE_COMPANY', payload: id }),
    logCommunication: (companyId, communication) =>
      dispatch({ type: 'LOG_COMMUNICATION', payload: { companyId, communication } })
  }

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  )
}

export const useCompanyContext = () => useContext(CompanyContext)