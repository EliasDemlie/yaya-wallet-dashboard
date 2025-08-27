import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { formatDate, formatAmount, getTransactionType, getAmountColor, getAmountPrefix } from '../utils/formatters'
import transactionApi from '../api/transactionApi'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

/**
 * TransactionDetails Page Component
 * Displays detailed information about a specific transaction
 */
const TransactionDetails = () => {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Search for the specific transaction
        const response = await transactionApi.searchTransactions(transactionId, ['transactionId'])
        
        if (response.transactions && response.transactions.length > 0) {
          setTransaction(response.transactions[0])
        } else {
          setError('Transaction not found')
        }
      } catch (err) {
        console.error('Error fetching transaction details:', err)
        setError('Failed to load transaction details')
      } finally {
        setLoading(false)
      }
    }

    if (transactionId) {
      fetchTransactionDetails()
    }
  }, [transactionId])

  const handleBack = () => {
    navigate('/')
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Transaction Not Found</h2>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const transactionType = getTransactionType(transaction)
  const isIncoming = transactionType === 'incoming'

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Transaction Details</h1>
      </div>

      {/* Transaction Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with Status */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {transaction.transactionId}
              </h2>
              <p className="text-sm text-gray-500">
                {formatDate(transaction.createdAt)}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isIncoming 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isIncoming ? 'Incoming' : 'Outgoing'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {transaction.status || 'Completed'}
              </span>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Amount</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getAmountColor(transaction)}`}>
                  {getAmountPrefix(transaction)}
                  {formatAmount(transaction.amount, transaction.currency)}
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {transaction.currency}
                  </span>
                </div>
              </div>
            </div>

            {/* Transaction Type */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Transaction Type</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Type:</span>
                  <span className="ml-2 text-sm text-gray-900 capitalize">{transaction.cause}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Direction:</span>
                  <span className={`ml-2 text-sm font-medium ${
                    isIncoming ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isIncoming ? 'Incoming' : 'Outgoing'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Parties Information */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">From</h3>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{transaction.sender}</p>
                <p className="text-gray-500 mt-1">Sender Account</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">To</h3>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{transaction.receiver}</p>
                <p className="text-gray-500 mt-1">Receiver Account</p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">Transaction ID:</span>
                <p className="text-gray-900 font-mono">{transaction.transactionId}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Created At:</span>
                <p className="text-gray-900">{formatDate(transaction.createdAt)}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Cause:</span>
                <p className="text-gray-900">{transaction.cause}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Status:</span>
                <p className="text-gray-900 capitalize">{transaction.status || 'Completed'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetails
