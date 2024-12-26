import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";

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

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation()

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity duration-300 ease-linear ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-30 transform transition duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-pink-600 text-white">
          <Link to="/" className="flex-shrink-0">
          
          <div className=' text-lg flex  justify-center items-center gap-4'><FaCalendar /><span >Calendar </span></div>

          </Link>
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-pink-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <IoMdClose className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav className="mt-5 px-2 space-y-1">
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
        </nav>
      </div>
    </>
  )
}

export default Sidebar

