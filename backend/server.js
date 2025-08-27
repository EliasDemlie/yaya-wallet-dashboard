const express = require('express')
const config = require('./config')
const Logger = require('./utils/logger')

// Import middleware
const corsMiddleware = require('./middleware/cors')
const loggingMiddleware = require('./middleware/logging')
const errorHandler = require('./middleware/errorHandler')
const notFoundHandler = require('./middleware/notFound')

// Import routes
const healthRoutes = require('./routes/health')
const transactionRoutes = require('./routes/transactions')

// Initialize Express app
const app = express()

// Validate configuration on startup
try {
  config.validate()
  Logger.success('Configuration validated successfully')
} catch (error) {
  Logger.error('Configuration validation failed:', error.message)
  process.exit(1)
}

// Middleware
app.use(corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggingMiddleware)

// Routes
app.use('/health', healthRoutes)
app.use('/transactions', transactionRoutes)

// Error handling middleware (must be last)
app.use(notFoundHandler)
app.use(errorHandler)

// Start server
const server = app.listen(config.port, () => {
  Logger.success(`Backend server running on port ${config.port}`)
  Logger.info(`Health check: http://localhost:${config.port}/health`)
  Logger.info(`CORS enabled for: ${config.cors.origin}`)
  Logger.info(`API credentials: ${config.yayaApi.apiKey ? '✅ Configured' : '❌ Missing'}`)
  Logger.info(`Authentication: HMAC-SHA256 with timestamp validation`)
  Logger.info(`Using real YaYa Wallet API with fallback to sample data`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  Logger.info('SIGTERM received, shutting down gracefully')
  server.close(() => {
    Logger.success('Process terminated')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  Logger.info('SIGINT received, shutting down gracefully')
  server.close(() => {
    Logger.success('Process terminated')
    process.exit(0)
  })
})

module.exports = app
