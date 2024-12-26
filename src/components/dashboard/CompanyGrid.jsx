import React, { useState } from 'react'
import { useCompanies } from '../../hooks/useCompanies'
import { useCompanyContext } from '../../context/CompanyContext'
import { formatDate } from '../../utils/dateUtils'
import { getStatusColor } from '../../utils/colorUtils'

const CompanyGrid = () => {
  const { companies } = useCompanies()
  const { communicationMethods, logCommunication } = useCompanyContext()
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [showCommunicationModal, setShowCommunicationModal] = useState(false)

  const handleLogCommunication = (data) => {
    selectedCompanies.forEach(companyId => {
      logCommunication(companyId, {
        ...data,
        date: new Date(),
        id: Date.now()
      })
    })
    setShowCommunicationModal(false)
    setSelectedCompanies([])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Companies Dashboard</h2>
        <button
          onClick={() => setShowCommunicationModal(true)}
          disabled={selectedCompanies.length === 0}
          className="button-primary disabled:opacity-50"
        >
          Log Communication
        </button>
      </div>

      <div className="grid gap-4">
        {companies.map(company => (
          <div 
            key={company.id}
            className={`card ${getStatusColor(company.status)} p-4`}
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedCompanies.includes(company.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCompanies([...selectedCompanies, company.id])
                  } else {
                    setSelectedCompanies(selectedCompanies.filter(id => id !== company.id))
                  }
                }}
                className="h-4 w-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{company.name}</h3>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {company.communications?.slice(0, 5).map(comm => (
                    <div
                      key={comm.id}
                      className="text-sm"
                      title={comm.notes}
                    >
                      {comm.type}
                      <br />
                      {formatDate(comm.date)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCommunicationModal && (
        <CommunicationModal
          communicationMethods={communicationMethods}
          onSubmit={handleLogCommunication}
          onClose={() => setShowCommunicationModal(false)}
        />
      )}
    </div>
  )
}


const CommunicationModal = ({ communicationMethods, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    type: communicationMethods[0]?.name,
    notes: ''
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Log Communication</h3>
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formData)
        }}>
          <div className="space-y-4">
            <div>
              <label className="form-label">
                Communication Type
              </label>
              <select
                className="form-input"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                {communicationMethods.map(method => (
                  <option key={method.name} value={method.name}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">
                Notes
              </label>
              <textarea
                className="form-input"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button-primary"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanyGrid
