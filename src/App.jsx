import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import CompanyList from './components/admin/CompanyList'
import CompanyForm from './components/admin/CompanyForm'
import CompanyGrid from './components/dashboard/CompanyGrid'
import Calendar from './components/dashboard/Calendar'
import CommunicationFrequency from './components/reports/CommunicationFrequency'
import ActivityLog from './components/reports/ActivityLog'
import CommunicationReports from './components/dashboard/CommunicationReports'

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CompanyGrid />} />
          <Route path="/admin/companies" element={<CompanyList />} />
          <Route path="/admin/companies/new" element={<CompanyForm />} />
          <Route path="/admin/companies/edit/:id" element={<CompanyForm />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/reports" element={<CommunicationReports />} />
          <Route path="/reports/frequency" element={<CommunicationFrequency />} />
          <Route path="/reports/activity" element={<ActivityLog />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
