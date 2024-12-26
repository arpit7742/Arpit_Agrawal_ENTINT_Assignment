import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompanyContext } from '../../context/CompanyContext';
import { Bell, Menu, X } from 'lucide-react';
import { FaHome } from "react-icons/fa";


import { HiOfficeBuilding } from "react-icons/hi";
import { FaCalendar } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";


const navigation = [
  { name: 'Dashboard', href: '/', icon: FaHome },
  { name: 'Calendar', href: '/calendar', icon: FaCalendar },
  { name: 'Reports', href: '/reports', icon: HiOfficeBuilding },
  { name: 'Communication Frequency', href: '/reports/frequency', icon: FaChartBar },
  { name: 'Activity Log', href: '/reports/activity', icon: FaClipboardList },
]

const Header = () => {
  const { companies } = useCompanyContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNotificationsCount = () => {
    let count = 0;
    const today = new Date();
    
    companies.forEach(company => {
      const lastComm = company.communications?.[0];
      if (!lastComm) {
        count++;
        return;
      }
      
      const daysSinceLastComm = Math.floor(
        (today - new Date(lastComm.date)) / (1000 * 60 * 60 * 24)
      );
      
      if (daysSinceLastComm >= company.communicationPeriodicity) {
        count++;
      }
    });
    
    return count;
  };

  return (
    <header className="bg-gray-300 border-b sticky top-0 z-50">
      <nav className="mx-5">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <span className="bg-pink-600 text-white p-2 rounded-lg">
                CT
              </span>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Calender Tracker
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6">
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="w-6 h-6 text-gray-600" />
                {getNotificationsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs min-w-5 h-5 flex items-center justify-center px-1.5 transform scale-100 group-hover:scale-110 transition-transform">
                    {getNotificationsCount()}
                  </span>
                )}
              </button>
            </div>
            
            <Link
              to="/admin/companies"
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors font-medium"
            >
              Admin Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="sm:hidden py-4 space-y-4">
            
            <div>
              {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`${
                              location.pathname === item.href
                                ? 'bg-pink-100 text-pink-900'
                                : 'text-gray-600 hover:bg-pink-50 hover:text-pink-900'
                            } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                          >
                            <item.icon
                              className={`${
                                location.pathname === item.href
                                  ? 'text-pink-500'
                                  : 'text-gray-400 group-hover:text-pink-500'
                              } mr-4 flex-shrink-0 h-6 w-6`}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                </div>
            <Link
              to="/admin/companies"
              className="block px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;