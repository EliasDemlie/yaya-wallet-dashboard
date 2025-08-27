const express = require('express')
const transactionService = require('../services/transactionService')
const { PAGINATION } = require('../config/constants')
const Logger = require('../utils/logger')

const router = express.Router()

/**
 * GET /transactions - Get paginated transactions
 * Query parameters:
 * - p: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 100)
 */
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.p) || PAGINATION.DEFAULT_PAGE
    const limit = Math.min(
      parseInt(req.query.limit) || PAGINATION.DEFAULT_LIMIT,
      PAGINATION.MAX_LIMIT
    )

    Logger.info(`GET /transactions - page: ${page}, limit: ${limit}`)
    
    const result = await transactionService.getTransactions(page, limit)
    
    Logger.success(`Serving ${result.transactions.length} transactions`)
    res.json(result)
    
  } catch (error) {
    Logger.error('Error in GET /transactions:', error)
    next(error)
  }
})

/**
 * POST /transactions/search - Search transactions
 * Request body:
 * - searchTerm: Search query (required)
 * - fields: Array of fields to search in (optional)
 */
router.post('/search', async (req, res, next) => {
  try {
    const { searchTerm, fields } = req.body
    
    if (!searchTerm || typeof searchTerm !== 'string') {
      return res.status(400).json({
        error: 'searchTerm is required and must be a string',
        timestamp: new Date().toISOString()
      })
    }

    Logger.info(`POST /transactions/search - query: "${searchTerm}"`)
    
    const result = await transactionService.searchTransactions(searchTerm, fields)
    
    Logger.success(`Search completed: ${result.totalResults} results found`)
    res.json(result)
    
  } catch (error) {
    Logger.error('Error in POST /transactions/search:', error)
    next(error)
  }
})

module.exports = router
