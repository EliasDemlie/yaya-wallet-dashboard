const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString()
  const method = req.method
  const path = req.path
  const userAgent = req.get('User-Agent') || 'Unknown'
  const ip = req.ip || req.connection.remoteAddress

  console.log(`${timestamp} - ${method} ${path} - IP: ${ip} - UA: ${userAgent}`)
  
  next()
}

module.exports = loggingMiddleware
