import { API_CONFIG, DEFAULT_HEADERS } from './config'

/**
 * HTTP Client for making API requests
 */
class HttpClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
  }

  /**
   * Make an HTTP request
   * @param {string} url - Request URL
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async request(url, options = {}) {
    const {
      method = 'GET',
      headers = {},
      body = null,
      timeout = this.timeout
    } = options

    const requestOptions = {
      method,
      headers: {
        ...DEFAULT_HEADERS,
        ...headers
      },
      timeout
    }

    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(`${this.baseURL}${url}`, requestOptions)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  /**
   * GET request
   * @param {string} url - Request URL
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Response data
   */
  async get(url, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const fullUrl = queryString ? `${url}?${queryString}` : url
    
    return this.request(fullUrl, { method: 'GET' })
  }

  /**
   * POST request
   * @param {string} url - Request URL
   * @param {Object} data - Request body
   * @returns {Promise<Object>} Response data
   */
  async post(url, data = {}) {
    return this.request(url, {
      method: 'POST',
      body: data
    })
  }

  /**
   * PUT request
   * @param {string} url - Request URL
   * @param {Object} data - Request body
   * @returns {Promise<Object>} Response data
   */
  async put(url, data = {}) {
    return this.request(url, {
      method: 'PUT',
      body: data
    })
  }

  /**
   * DELETE request
   * @param {string} url - Request URL
   * @returns {Promise<Object>} Response data
   */
  async delete(url) {
    return this.request(url, { method: 'DELETE' })
  }
}

export default new HttpClient()
