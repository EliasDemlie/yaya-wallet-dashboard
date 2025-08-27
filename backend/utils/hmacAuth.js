const crypto = require('crypto')
const config = require('../config')

/**
 * Create HMAC signature for YaYa Wallet API
 * @param {string} timestamp - Unix timestamp
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} endpoint - API endpoint path
 * @param {string} body - Request body (empty string for GET requests)
 * @returns {string} Base64 encoded signature
 */
const createSignature = (timestamp, method, endpoint, body = '') => {
  // Create pre-hash string: {timestamp+method+endpoint+body}
  const preHashString = timestamp + method + endpoint + body
  
  console.log('🔐 Signature Debug:', {
    timestamp,
    method,
    endpoint,
    body,
    preHashString: preHashString.substring(0, 100) + '...'
  })
  
  // Use API-Secret to encrypt with SHA256 HMAC
  const hmac = crypto.createHmac('sha256', config.yayaApi.apiSecret)
  hmac.update(preHashString)
  
  // Base64 encode the result
  const signature = hmac.digest('base64')
  
  console.log('🔐 Generated Signature:', signature.substring(0, 20) + '...')
  
  return signature
}

/**
 * Generate authenticated headers for YaYa Wallet API
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint path
 * @param {string} body - Request body
 * @returns {Object} Headers object with authentication
 */
const getAuthHeaders = (method, endpoint, body = '') => {
  const timestamp = Date.now().toString()
  const signature = createSignature(timestamp, method, endpoint, body)
  
  return {
    'Content-Type': 'application/json',
    'YAYA-API-KEY': config.yayaApi.apiKey,
    'YAYA-API-TIMESTAMP': timestamp,
    'YAYA-API-SIGN': signature
  }
}

module.exports = {
  createSignature,
  getAuthHeaders
}
