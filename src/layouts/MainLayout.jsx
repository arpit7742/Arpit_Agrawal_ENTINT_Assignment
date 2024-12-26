import React from 'react'
import Header from '../components/shared/Header'
import Sidebar from '../components/shared/Sidebar'
import Notifications from '../components/dashboard/Notifications'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                {children}
              </div>
            </div>
          </div>
        </main>
        <aside className="hidden lg:block w-80 bg-white p-6 border-l border-gray-200">
          <Notifications />
        </aside>
      </div>
    </div>
  )
}

export default MainLayout
