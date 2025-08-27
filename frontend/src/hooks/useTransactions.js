import { useState, useEffect, useCallback } from 'react'
import transactionApi from '../api/transactionApi'

export const useTransactions = (initialPage = 1, initialLimit = 10) => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const fetchTransactions = useCallback(async (page = currentPage, limit = initialLimit) => {
    try {
      setLoading(true)
      setError(null)
      const response = await transactionApi.getTransactions(page, limit)
      setTransactions(response.transactions || [])
      setTotalPages(response.totalPages || 1)
      setTotalItems(response.totalItems || 0)
    } catch (err) {
      console.error('Error fetching transactions:', err)
      setError('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }, [currentPage, initialLimit])

  const changePage = useCallback((page) => {
    setCurrentPage(page)
    fetchTransactions(page)
  }, [fetchTransactions])

  const refresh = useCallback(() => {
    fetchTransactions(currentPage)
  }, [fetchTransactions, currentPage])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return {
    transactions,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    changePage,
    refresh
  }
}
