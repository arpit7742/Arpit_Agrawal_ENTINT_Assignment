import React, { useState, useMemo } from 'react'
import { useCompanyContext } from '../../context/CompanyContext'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const CommunicationFrequency = () => {
  const { companies, communicationMethods } = useCompanyContext()
  const [timeFrame, setTimeFrame] = useState('30') // days
  const [selectedCompany, setSelectedCompany] = useState('all')

  const chartData = useMemo(() => {
    const now = new Date()
    const cutoffDate = new Date(now.setDate(now.getDate() - parseInt(timeFrame)))
    
    
    const methodCounts = communicationMethods.reduce((acc, method) => {
      acc[method.name] = 0
      return acc
    }, {})

    
    const relevantCompanies = selectedCompany === 'all'
      ? companies
      : companies.filter(c => c.id === parseInt(selectedCompany))

    relevantCompanies.forEach(company => {
      (company.communications || []).forEach(comm => {
        if (new Date(comm.date) >= cutoffDate) {
          methodCounts[comm.type]++
        }
      })
    })

    
    return Object.entries(methodCounts).map(([type, count]) => ({
      type,
      count
    }))
  }, [companies, timeFrame, selectedCompany, communicationMethods])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Communication Frequency</h1>
        
        <div className="flex space-x-4">
          <select
            className="border p-2 rounded"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          
          <select
            className="border p-2 rounded"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="all">All Companies</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CommunicationFrequency

