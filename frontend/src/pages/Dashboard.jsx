import React from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useSearch } from '../hooks/useSearch'
import { useDebounce } from '../hooks/useDebounce'
import SearchBar from '../components/SearchBar'
import TransactionTable from '../components/TransactionTable'
import Pagination from '../components/Pagination'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { formatAmount } from '../utils/formatters'

const Dashboard = () => {
  const { transactions, loading, error, currentPage, totalPages, totalItems, changePage, refresh } = useTransactions()
  const { searchResults, searchTerm, isSearching, searchError, performSearch, clearSearch } = useSearch()
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const displayTransactions = searchTerm ? searchResults : transactions
  const showPagination = !searchTerm && totalPages > 1
  const displayError = error || searchError

  const handleSearch = (term) => {
    if (term.trim()) {
      performSearch(term)
    } else {
      clearSearch()
    }
  }

  // Calculate summary stats
  const incomingCount = displayTransactions.filter(t => 
    t.amount > 0 || t.type === 'incoming' || t.receiver === 'current_user'
  ).length
  const outgoingCount = displayTransactions.filter(t => 
    t.amount < 0 || t.type === 'outgoing' || t.sender === 'current_user'
  ).length
  const totalAmount = displayTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  
  // Calculate balance (incoming - outgoing)
  const incomingAmount = displayTransactions
    .filter(t => t.amount > 0 || t.type === 'incoming' || t.receiver === 'current_user')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const outgoingAmount = displayTransactions
    .filter(t => t.amount < 0 || t.type === 'outgoing' || t.sender === 'current_user')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const balance = incomingAmount - outgoingAmount

  if (loading && !isSearching) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transaction Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor your wallet transactions</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">System Online</span>
          </div>
        </div>
      </div>

      {/* Balance Panel */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Balance Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Balance</p>
                <p className="text-2xl font-bold">{formatAmount(balance, 'USD')}</p>
              </div>
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">$</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Incoming</p>
                <p className="text-2xl font-bold">{formatAmount(incomingAmount, 'USD')}</p>
              </div>
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">+</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Outgoing</p>
                <p className="text-2xl font-bold">{formatAmount(outgoingAmount, 'USD')}</p>
              </div>
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">-</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Transactions</p>
                <p className="text-2xl font-bold">{displayTransactions.length}</p>
              </div>
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Statistics Panel */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Transaction Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">+</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Incoming Transactions</p>
                <p className="text-2xl font-semibold text-green-600">{incomingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">-</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Outgoing Transactions</p>
                <p className="text-2xl font-semibold text-red-600">{outgoingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">%</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Success Rate</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {displayTransactions.length > 0 ? '98.5%' : '0%'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <SearchBar onSearch={handleSearch} placeholder="Search transactions..." />
      </div>

      {/* Transaction History Panel */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
            {searchTerm && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Search results for: "{searchTerm}"</span>
                <button
                  onClick={clearSearch}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {displayError ? (
            <ErrorMessage message={displayError} onRetry={refresh} />
          ) : (
            <>
              <TransactionTable transactions={displayTransactions} />
              {showPagination && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={changePage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
