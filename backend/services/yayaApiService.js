const axios = require('axios')
const config = require('../config')
const { getAuthHeaders } = require('../utils/hmacAuth')
const { API_ENDPOINTS, HTTP_METHODS } = require('../config/constants')
const Logger = require('../utils/logger')

class YayaApiService {
  constructor() {
    this.baseURL = config.yayaApi.baseUrl
    this.timeout = config.yayaApi.timeout
  }

  /**
   * Fetch transactions from YaYa Wallet API
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} API response
   */
  async fetchTransactions(page = 1, limit = 10) {
    try {
      Logger.api(`Fetching transactions: page=${page}, limit=${limit}`)
      
      const endpoint = API_ENDPOINTS.TRANSACTIONS.FIND_BY_USER
      const url = `${this.baseURL}${endpoint}`
      
      const response = await axios.get(url, {
        headers: getAuthHeaders(HTTP_METHODS.GET, endpoint, ''),
        params: {
          page: parseInt(page),
          limit: parseInt(limit)
        },
        timeout: this.timeout
      })

      Logger.success('Successfully fetched transactions from YaYa API')
      return response.data
      
    } catch (error) {
      Logger.error('Error fetching transactions from YaYa API:', error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Search transactions in YaYa Wallet API
   * @param {string} searchTerm - Search query
   * @returns {Promise<Object>} API response
   */
  async searchTransactions(searchTerm) {
    try {
      Logger.api(`Searching transactions with query: ${searchTerm}`)
      
      const endpoint = API_ENDPOINTS.TRANSACTIONS.SEARCH
      const url = `${this.baseURL}${endpoint}`
      const requestBody = { query: searchTerm }
      
      const response = await axios.post(url, requestBody, {
        headers: getAuthHeaders(HTTP_METHODS.POST, endpoint, JSON.stringify(requestBody)),
        timeout: this.timeout
      })

      Logger.success('Search completed via YaYa API')
      return response.data
      
    } catch (error) {
      Logger.error('Error searching transactions from YaYa API:', error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Test API connectivity
   * @returns {Promise<boolean>} Connection status
   */
  async testConnection() {
    try {
      const response = await axios.get(`${this.baseURL}/health`, {
        timeout: 5000
      })
      return response.status === 200
    } catch (error) {
      Logger.warn('API connection test failed:', error.message)
      return false
    }
  }
}

module.exports = new YayaApiService()
