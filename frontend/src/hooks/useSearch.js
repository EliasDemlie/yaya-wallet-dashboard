import { useState, useCallback } from 'react'
import transactionApi from '../api/transactionApi'

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState(null)

  const performSearch = useCallback(async (term, fields = ['sender', 'receiver', 'cause', 'transactionId']) => {
    if (!term.trim()) {
      setSearchResults([])
      setSearchError(null)
      return
    }

    try {
      setIsSearching(true)
      setSearchError(null)
      const response = await transactionApi.searchTransactions(term, fields)
      setSearchResults(response.transactions || [])
    } catch (err) {
      console.error('Search error:', err)
      setSearchError('Search failed. Please try again.')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  const clearSearch = useCallback(() => {
    setSearchResults([])
    setSearchTerm('')
    setSearchError(null)
  }, [])

  return {
    searchResults,
    searchTerm,
    isSearching,
    searchError,
    performSearch,
    clearSearch
  }
}
