import React, { useState } from 'react'
import { useCompanyContext } from '../../context/CompanyContext'

const CommunicationModal = ({ companyIds, onClose }) => {
  const { communicationMethods, logCommunication } = useCompanyContext()
  const [formData, setFormData] = useState({
    type: communicationMethods[0].name,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    companyIds.forEach(id => {
      logCommunication(id, formData)
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Log Communication</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Communication Type</label>
            <select
              className="w-full border p-2 rounded"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              {communicationMethods.map(method => (
                <option key={method.id} value={method.name}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Notes</label>
            <textarea
              className="w-full border p-2 rounded"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommunicationModal