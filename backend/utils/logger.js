const config = require('../config')

class Logger {
  static info(message, data = {}) {
    const timestamp = new Date().toISOString()
    console.log(`ℹ️  ${timestamp} - INFO: ${message}`, data)
  }

  static success(message, data = {}) {
    const timestamp = new Date().toISOString()
    console.log(`✅ ${timestamp} - SUCCESS: ${message}`, data)
  }

  static error(message, error = null) {
    const timestamp = new Date().toISOString()
    console.error(`❌ ${timestamp} - ERROR: ${message}`, error)
  }

  static warn(message, data = {}) {
    const timestamp = new Date().toISOString()
    console.warn(`⚠️  ${timestamp} - WARN: ${message}`, data)
  }

  static debug(message, data = {}) {
    if (config.nodeEnv === 'development') {
      const timestamp = new Date().toISOString()
      console.log(`🔍 ${timestamp} - DEBUG: ${message}`, data)
    }
  }

  static api(message, data = {}) {
    const timestamp = new Date().toISOString()
    console.log(`🌐 ${timestamp} - API: ${message}`, data)
  }
}

module.exports = Logger
