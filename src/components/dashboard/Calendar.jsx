import React from 'react'
import { useCompanyContext } from '../../context/CompanyContext'

const Calendar = () => {
  const { companies } = useCompanyContext()
  const allCommunications = companies.flatMap(company => 
    (company.communications || []).map(comm => ({
      ...comm,
      companyName: company.name,
      companyId: company.id
    }))
  )

  const groupedCommunications = allCommunications.reduce((acc, comm) => {
    const date = comm.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(comm)
    return acc
  }, {})
  
  const today = new Date()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  const days = []

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d))
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Communication Calendar</h1>
      
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold p-2">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          const dateStr = day.toISOString().split('T')[0]
          const dayComms = groupedCommunications[dateStr] || []
          
          return (
            <div
              key={dateStr}
              className={`border rounded p-2 min-h-[100px] ${
                day.toDateString() === today.toDateString() ? 'bg-pink-50' : ''
              }`}
              style={{ gridColumnStart: index === 0 ? day.getDay() + 1 : 'auto' }}
            >
              <div className="font-semibold">{day.getDate()}</div>
              {dayComms.map((comm, i) => (
                <div
                  key={i}
                  className="text-sm p-1 mt-1 bg-pink-100 rounded"
                  title={comm.notes}
                >
                  {comm.companyName} - {comm.type}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar