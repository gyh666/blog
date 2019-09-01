// 处理端口相关配置
const http = require('http')

const PORT = 8000
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(PORT)