import httpClient from './httpClient'
import { API_CONFIG } from './config'

/**
 * Transaction API Service
 */
class TransactionApi {
  /**
   * Get paginated transactions
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Transactions data with pagination
   */
  async getTransactions(page = 1, limit = 10) {
    return httpClient.get(API_CONFIG.ENDPOINTS.TRANSACTIONS, {
      p: page,
      limit
    })
  }

  /**
   * Search transactions
   * @param {string} searchTerm - Search query
   * @param {Array} fields - Fields to search in
   * @returns {Promise<Object>} Search results
   */
  async searchTransactions(searchTerm, fields = ['sender', 'receiver', 'cause', 'transactionId']) {
    return httpClient.post(API_CONFIG.ENDPOINTS.SEARCH, {
      searchTerm,
      fields
    })
  }

  /**
   * Get health status
   * @returns {Promise<Object>} Health check data
   */
  async getHealth() {
    return httpClient.get(API_CONFIG.ENDPOINTS.HEALTH)
  }
}

export default new TransactionApi()
