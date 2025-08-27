import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center">
                              <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Y</span>
                    </div>
                  </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">YaYa Wallet</h1>
              <p className="text-sm text-gray-500">Transaction Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
                                    <Link
                        to="/"
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive('/')
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        Dashboard
                      </Link>
            </div>
          </div>

                            {/* Mobile menu button */}
                  <div className="md:hidden">
                    <button className="text-gray-600 hover:text-gray-900">
                      Menu
                    </button>
                  </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
                                <Link
                      to="/"
                      className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive('/')
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Dashboard
                    </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
