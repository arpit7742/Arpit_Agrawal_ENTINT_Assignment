import React from 'react'
import { useCompanyContext } from '../../context/CompanyContext'
import { isOverdue, isDueToday } from '../../utils/dateUtils'
import { AlertTriangle, Clock } from 'lucide-react'

const Notifications = () => {
  const { companies } = useCompanyContext()

  const getNotifications = () => {
    return companies.filter(company => {
      const lastCommunication = company.communications?.[0]
      return isOverdue(lastCommunication, company.communicationFrequency) || isDueToday(lastCommunication, company.communicationFrequency)
    })
  }

  const notifications = getNotifications()

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications at this time.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map(company => {
            const lastCommunication = company.communications?.[0]
            const isOverdueNotification = isOverdue(lastCommunication, company.communicationFrequency)

            return (
              <li key={company.id} className={`p-4 rounded-md ${isOverdueNotification ? 'bg-red-50' : 'bg-yellow-50'}`}>
                <div className="flex items-center">
                  {isOverdueNotification ? (
                    <AlertTriangle className="text-red-500 mr-2" size={20} />
                  ) : (
                    <Clock className="text-yellow-500 mr-2" size={20} />
                  )}
                  <p className={`text-sm font-medium ${isOverdueNotification ? 'text-red-800' : 'text-yellow-800'}`}>
                    {company.name}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {isOverdueNotification ? 'Overdue for communication' : 'Due for communication today'}
                </p>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Notifications
