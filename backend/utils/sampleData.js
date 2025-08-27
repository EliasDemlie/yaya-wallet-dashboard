const { TRANSACTION_TYPES } = require('../config/constants')

/**
 * Generate sample transaction data for testing/fallback
 * @param {number} page - Current page number
 * @param {number} limit - Number of items per page
 * @returns {Array} Array of sample transactions
 */
const generateSampleTransactions = (page = 1, limit = 10) => {
  const transactions = []
  const startId = (page - 1) * limit + 1
  
  for (let i = 0; i < limit; i++) {
    const id = startId + i
    const isIncoming = Math.random() > 0.5
    const amount = Math.floor(Math.random() * 10000) / 100 // Random amount between 0-100
    
    transactions.push({
      transactionId: `TXN${id.toString().padStart(6, '0')}`,
      sender: isIncoming ? `user_${Math.floor(Math.random() * 1000)}` : 'current_user',
      receiver: isIncoming ? 'current_user' : `user_${Math.floor(Math.random() * 1000)}`,
      amount: isIncoming ? amount : -amount,
      currency: ['USD', 'EUR', 'GBP'][Math.floor(Math.random() * 3)],
      cause: ['Payment', 'Transfer', 'Refund', 'Deposit', 'Withdrawal'][Math.floor(Math.random() * 5)],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date in last 30 days
      type: isIncoming ? TRANSACTION_TYPES.INCOMING : TRANSACTION_TYPES.OUTGOING,
      status: 'completed'
    })
  }
  
  return transactions
}

/**
 * Generate sample search results
 * @param {string} searchTerm - Search query
 * @param {Array} fields - Fields to search in
 * @returns {Array} Filtered sample transactions
 */
const generateSampleSearchResults = (searchTerm, fields = ['sender', 'receiver', 'cause', 'transactionId']) => {
  const allTransactions = generateSampleTransactions(1, 50) // Generate more data for search
  
  return allTransactions.filter(transaction => {
    const searchLower = searchTerm.toLowerCase()
    return fields.some(field => {
      const value = transaction[field]
      return value && value.toString().toLowerCase().includes(searchLower)
    })
  })
}

/**
 * Get total number of sample transactions for pagination
 * @returns {number} Total count
 */
const getTotalSampleTransactions = () => {
  return 150 // Total number of sample transactions
}

module.exports = {
  generateSampleTransactions,
  generateSampleSearchResults,
  getTotalSampleTransactions
}
