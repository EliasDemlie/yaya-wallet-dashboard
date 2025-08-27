import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  formatDate, 
  formatAmount, 
  getTransactionType, 
  getAmountColor, 
  getAmountPrefix,
  truncateText,
  formatTransactionId
} from '../utils/formatters'
import { TABLE_COLUMNS, SORT_DIRECTIONS } from '../utils/constants'

const TransactionTable = ({ transactions }) => {
  const navigate = useNavigate()
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.DESC)

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === SORT_DIRECTIONS.ASC ? SORT_DIRECTIONS.DESC : SORT_DIRECTIONS.ASC)
    } else {
      setSortField(field)
      setSortDirection(SORT_DIRECTIONS.ASC)
    }
  }

  const handleRowClick = (transaction) => {
    navigate(`/transaction/${transaction.transactionId}`)
  }

  const getSortedTransactions = () => {
    return [...transactions].sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === 'createdAt') {
        aValue = new Date(aValue || 0)
        bValue = new Date(bValue || 0)
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortDirection === SORT_DIRECTIONS.ASC) {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
        <p className="text-gray-500">Try adjusting your search criteria or check back later.</p>
      </div>
    )
  }

  const sortedTransactions = getSortedTransactions()

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {TABLE_COLUMNS.map((column) => (
              <th 
                key={column.key}
                className={`px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable && sortField === column.key && (
                    <span className="ml-1">
                      {sortDirection === SORT_DIRECTIONS.ASC ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedTransactions.map((transaction, index) => (
            <tr 
              key={transaction.transactionId || index} 
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick(transaction)}
            >
              <td className="px-3 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                {formatTransactionId(transaction.transactionId)}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="max-w-xs truncate" title={transaction.sender}>
                  {truncateText(transaction.sender, 30)}
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="max-w-xs truncate" title={transaction.receiver}>
                  {truncateText(transaction.receiver, 30)}
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm">
                <span className={`font-medium ${getAmountColor(transaction)}`}>
                  {getAmountPrefix(transaction)}
                  {formatAmount(transaction.amount, transaction.currency)}
                </span>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {transaction.currency || 'USD'}
                </span>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="max-w-xs truncate" title={transaction.cause}>
                  {truncateText(transaction.cause, 30)}
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(transaction.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
