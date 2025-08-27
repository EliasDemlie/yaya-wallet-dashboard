require('dotenv').config()

const config = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // YaYa Wallet API Configuration
  yayaApi: {
    baseUrl: process.env.YAYA_API_BASE || 'https://sandbox.yayawallet.com/api/en',
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    timeout: 10000 // 10 seconds
  },
  
  // CORS Configuration
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  },
  
  // Validation
  validate: () => {
    if (!config.yayaApi.apiKey || !config.yayaApi.apiSecret) {
      throw new Error('Missing required environment variables: API_KEY and API_SECRET')
    }
  }
}

module.exports = config
