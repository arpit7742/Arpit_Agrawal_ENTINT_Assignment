import React, { useState } from 'react'
import { useCompanyContext } from '../../context/CompanyContext'

const ActivityLog = () => {
  const { companies } = useCompanyContext()
  const [filters, setFilters] = useState({
    company: 'all',
    type: 'all',
    dateRange: '30'
  })

  
  const allActivities = companies.flatMap(company =>
    (company.communications || []).map(comm => ({
      ...comm,
      companyName: company.name,
      companyId: company.id
    }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date))

  
  const filteredActivities = allActivities.filter(activity => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(filters.dateRange))
    
    return (
      (filters.company === 'all' || activity.companyId === parseInt(filters.company)) &&
      (filters.type === 'all' || activity.type === filters.type) &&
      new Date(activity.date) >= cutoffDate
    )
  })

  
  const communicationTypes = [...new Set(allActivities.map(a => a.type))]

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Activity Log</h1>
        
        <div className="flex space-x-4">
          <select
            className="border p-2 rounded"
            value={filters.company}
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
          >
            <option value="all">All Companies</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          
          <select
            className="border p-2 rounded"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="all">All Types</option>
            {communicationTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          
          <select
            className="border p-2 rounded"
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredActivities.map((activity, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(activity.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {activity.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {activity.type}
                </td>
                <td className="px-6 py-4">
                  {activity.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredActivities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No activities found for the selected filters
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityLog