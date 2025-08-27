const { ERROR_MESSAGES } = require('../config/constants')

const errorHandler = (err, req, res, next) => {
  console.error('❌ Unhandled error:', err)
  
  // Default error response
  const errorResponse = {
    error: ERROR_MESSAGES.INTERNAL_ERROR,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    errorResponse.error = ERROR_MESSAGES.INVALID_REQUEST
    errorResponse.details = err.message
    return res.status(400).json(errorResponse)
  }

  if (err.name === 'UnauthorizedError') {
    errorResponse.error = 'Unauthorized'
    return res.status(401).json(errorResponse)
  }

  // Default 500 error
  res.status(500).json(errorResponse)
}

module.exports = errorHandler
