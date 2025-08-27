// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  ENDPOINTS: {
    TRANSACTIONS: '/transactions',
    SEARCH: '/transactions/search',
    HEALTH: '/health'
  },
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3
}

// HTTP Methods
const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

// Default headers
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

export { API_CONFIG, HTTP_METHODS, DEFAULT_HEADERS }
