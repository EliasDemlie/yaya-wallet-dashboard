const yayaApiService = require('./yayaApiService')
const { generateSampleTransactions, generateSampleSearchResults, getTotalSampleTransactions } = require('../utils/sampleData')
const { PAGINATION, STATUS } = require('../config/constants')
const Logger = require('../utils/logger')

class TransactionService {
  /**
   * Get transactions with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Formatted response with transactions and pagination
   */
  async getTransactions(page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT) {
    try {
      // Try to fetch from real API first
      const apiResponse = await yayaApiService.fetchTransactions(page, limit)
      
      // If successful, return the API response
      if (apiResponse && (apiResponse.transactions || Array.isArray(apiResponse))) {
        return this.formatApiResponse(apiResponse, page, limit)
      }
      
      throw new Error('Invalid API response format')
      
    } catch (error) {
      Logger.warn('Falling back to sample data for testing...')
      
      // Fallback to sample data
      const transactions = generateSampleTransactions(page, limit)
      const totalTransactions = getTotalSampleTransactions() // Use the new function
      const totalPages = Math.ceil(totalTransactions / limit)
      
      return {
        transactions,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalTransactions,
          itemsPerPage: limit
        },
        success: STATUS.SUCCESS,
        note: 'Using sample data (API unavailable)'
      }
    }
  }

  /**
   * Search transactions
   * @param {string} searchTerm - Search query
   * @param {Array} fields - Fields to search in
   * @returns {Promise<Object>} Search results
   */
  async searchTransactions(searchTerm, fields = ['sender', 'receiver', 'cause', 'transactionId']) {
    try {
      // Try to search in real API first
      const apiResponse = await yayaApiService.searchTransactions(searchTerm)
      
      // If successful, return the API response
      if (apiResponse && (apiResponse.transactions || Array.isArray(apiResponse))) {
        return this.formatSearchResponse(apiResponse, searchTerm)
      }
      
      throw new Error('Invalid API response format')
      
    } catch (error) {
      Logger.warn('Falling back to sample data for testing...')
      
      // Fallback to sample data
      const searchResults = generateSampleSearchResults(searchTerm, fields)
      
      return {
        transactions: searchResults,
        searchTerm,
        totalResults: searchResults.length,
        success: STATUS.SUCCESS,
        note: 'Using sample data (API unavailable)'
      }
    }
  }

  /**
   * Format API response for consistency
   * @param {Object} apiResponse - Raw API response
   * @param {number} page - Current page
   * @param {number} limit - Items per page
   * @returns {Object} Formatted response
   */
  formatApiResponse(apiResponse, page, limit) {
    // Handle different response formats
    if (apiResponse.success && apiResponse.transactions) {
      return {
        transactions: apiResponse.transactions,
        pagination: apiResponse.pagination || {
          currentPage: page,
          totalPages: 1,
          totalItems: apiResponse.transactions.length,
          itemsPerPage: limit
        },
        success: STATUS.SUCCESS
      }
    } else if (apiResponse.transactions) {
      return {
        transactions: apiResponse.transactions,
        pagination: {
          currentPage: page,
          totalPages: apiResponse.totalPages || Math.ceil(apiResponse.total / limit),
          totalItems: apiResponse.total || apiResponse.transactions.length,
          itemsPerPage: limit
        },
        success: STATUS.SUCCESS
      }
    } else if (Array.isArray(apiResponse)) {
      return {
        transactions: apiResponse,
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: apiResponse.length,
          itemsPerPage: limit
        },
        success: STATUS.SUCCESS
      }
    }
    
    return {
      transactions: [],
      pagination: {
        currentPage: page,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: limit
      },
      success: STATUS.SUCCESS
    }
  }

  /**
   * Format search response for consistency
   * @param {Object} apiResponse - Raw API response
   * @param {string} searchTerm - Search query
   * @returns {Object} Formatted search response
   */
  formatSearchResponse(apiResponse, searchTerm) {
    if (apiResponse.success && apiResponse.transactions) {
      return {
        transactions: apiResponse.transactions,
        searchTerm,
        totalResults: apiResponse.transactions.length,
        success: STATUS.SUCCESS
      }
    } else if (apiResponse.transactions) {
      return {
        transactions: apiResponse.transactions,
        searchTerm,
        totalResults: apiResponse.transactions.length,
        success: STATUS.SUCCESS
      }
    } else if (Array.isArray(apiResponse)) {
      return {
        transactions: apiResponse,
        searchTerm,
        totalResults: apiResponse.length,
        success: STATUS.SUCCESS
      }
    }
    
    return {
      transactions: [],
      searchTerm,
      totalResults: 0,
      success: STATUS.SUCCESS
    }
  }
}

module.exports = new TransactionService()
