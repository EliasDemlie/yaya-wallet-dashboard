// Transaction types
export const TRANSACTION_TYPES = {
  INCOMING: 'incoming',
  OUTGOING: 'outgoing',
  UNKNOWN: 'unknown'
}

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
}

// Search fields
export const SEARCH_FIELDS = [
  'sender',
  'receiver', 
  'cause',
  'transactionId'
]

// Table columns
export const TABLE_COLUMNS = [
  { key: 'transactionId', label: 'Transaction ID', sortable: true },
  { key: 'sender', label: 'Sender', sortable: true },
  { key: 'receiver', label: 'Receiver', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'currency', label: 'Currency', sortable: false },
  { key: 'cause', label: 'Cause', sortable: true },
  { key: 'createdAt', label: 'Created At', sortable: true }
]

// Sort directions
export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc'
}

// Error messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to load transactions. Please try again.',
  SEARCH_FAILED: 'Failed to search transactions. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
}

// Success messages
export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'Data loaded successfully',
  SEARCH_COMPLETED: 'Search completed successfully'
}

// Loading states
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
}
