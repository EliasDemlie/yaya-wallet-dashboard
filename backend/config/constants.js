// API Endpoints
const API_ENDPOINTS = {
  TRANSACTIONS: {
    FIND_BY_USER: '/transaction/find-by-user',
    SEARCH: '/transaction/search'
  }
}

// HTTP Methods
const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

// Response Status
const STATUS = {
  SUCCESS: 'success',
  ERROR: 'error'
}

// Transaction Types
const TRANSACTION_TYPES = {
  INCOMING: 'incoming',
  OUTGOING: 'outgoing'
}

// Pagination Defaults
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
}

// Error Messages
const ERROR_MESSAGES = {
  MISSING_CREDENTIALS: 'Missing required environment variables: API_KEY and API_SECRET',
  API_ERROR: 'Error fetching data from YaYa API',
  SEARCH_ERROR: 'Error searching transactions',
  INVALID_REQUEST: 'Invalid request',
  NOT_FOUND: 'Route not found',
  INTERNAL_ERROR: 'Internal server error'
}

// Success Messages
const SUCCESS_MESSAGES = {
  SERVER_STARTED: 'Backend server running on port',
  HEALTH_CHECK: 'Health check available at',
  CORS_ENABLED: 'CORS enabled for',
  API_CONFIGURED: 'API credentials configured',
  AUTH_METHOD: 'Authentication method',
  FALLBACK_MODE: 'Using real YaYa Wallet API with fallback to sample data'
}

module.exports = {
  API_ENDPOINTS,
  HTTP_METHODS,
  STATUS,
  TRANSACTION_TYPES,
  PAGINATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
}
