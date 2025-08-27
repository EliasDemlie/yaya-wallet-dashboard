/**
 * Format date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Format amount with currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted amount
 */
export const formatAmount = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return 'N/A'
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(Math.abs(amount))
  } catch (error) {
    return `${Math.abs(amount)} ${currency}`
  }
}

/**
 * Get transaction type (incoming/outgoing)
 * @param {Object} transaction - Transaction object
 * @returns {string} Transaction type
 */
export const getTransactionType = (transaction) => {
  // First check if type is explicitly set
  if (transaction.type) {
    return transaction.type.toLowerCase()
  }
  
  // Check if amount is negative (outgoing) or positive (incoming)
  if (transaction.amount !== null && transaction.amount !== undefined) {
    return transaction.amount >= 0 ? 'incoming' : 'outgoing'
  }
  
  // Fallback logic based on sender/receiver
  if (transaction.sender && transaction.receiver) {
    // If sender is 'current_user', it's outgoing
    if (transaction.sender === 'current_user') {
      return 'outgoing'
    }
    // If receiver is 'current_user', it's incoming
    if (transaction.receiver === 'current_user') {
      return 'incoming'
    }
  }
  
  return 'unknown'
}

/**
 * Get amount color class based on transaction type
 * @param {Object} transaction - Transaction object
 * @returns {string} CSS class name
 */
export const getAmountColor = (transaction) => {
  const type = getTransactionType(transaction)
  return type === 'incoming' ? 'text-green-600' : 'text-red-600'
}

/**
 * Get amount prefix (+ or -) based on transaction type
 * @param {Object} transaction - Transaction object
 * @returns {string} Prefix
 */
export const getAmountPrefix = (transaction) => {
  const type = getTransactionType(transaction)
  return type === 'incoming' ? '+' : '-'
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Format transaction ID for display
 * @param {string} transactionId - Transaction ID
 * @returns {string} Formatted transaction ID
 */
export const formatTransactionId = (transactionId) => {
  if (!transactionId) return 'N/A'
  return transactionId.toUpperCase()
}
