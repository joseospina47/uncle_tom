'use strict'

require('./lib/app')
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('Hi, I\'m Tom, Capmotion\'s AI Director')
  res.end()
}).listen(process.env.PORT || 3000)
