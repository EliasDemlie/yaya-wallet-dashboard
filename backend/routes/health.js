const express = require('express')
const config = require('../config')
const yayaApiService = require('../services/yayaApiService')
const Logger = require('../utils/logger')

const router = express.Router()

/**
 * GET /health - Health check endpoint
 * Returns server status and configuration info
 */
router.get('/', async (req, res) => {
  try {
    const healthData = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      config: {
        port: config.port,
        apiConfigured: !!(config.yayaApi.apiKey && config.yayaApi.apiSecret),
        apiKey: config.yayaApi.apiKey ? `${config.yayaApi.apiKey.substring(0, 10)}...` : 'Not configured',
        apiBase: config.yayaApi.baseUrl,
        authMethod: 'HMAC-SHA256',
        corsOrigin: config.cors.origin
      }
    }

    // Test API connectivity if credentials are configured
    if (config.yayaApi.apiKey && config.yayaApi.apiSecret) {
      try {
        const apiConnected = await yayaApiService.testConnection()
        healthData.apiStatus = apiConnected ? 'connected' : 'disconnected'
      } catch (error) {
        healthData.apiStatus = 'error'
        healthData.apiError = error.message
      }
    } else {
      healthData.apiStatus = 'not_configured'
    }

    Logger.info('Health check requested')
    res.json(healthData)
    
  } catch (error) {
    Logger.error('Error in health check:', error)
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message
    })
  }
})

module.exports = router
