const { ERROR_MESSAGES } = require('../config/constants')

const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: ERROR_MESSAGES.NOT_FOUND,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  })
}

module.exports = notFoundHandler
