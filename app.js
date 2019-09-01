// app.js:系统基础功能相关配置
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理 post的 data数据
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') return resolve({})
    if (req.headers['content-type'] !== 'application/json') return resolve({})

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      if (!postData) return resolve({})
      resolve(
        JSON.parse(postData)
      )
    })
  })

  return promise
} 

// 处理公共参数、公共设置
const serverHandle = (req, res) => {
  // 设置返回格式为JSON
  res.setHeader('Content-type', 'application/json')

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 处理post data
  getPostData(req).then(postData => {
    req.body = postData

    // 处理blog路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
      res.end(
        JSON.stringify(blogData)
      )
      return
    }

    // 处理user路由
    const userData = handleUserRouter(req, res)
    if (userData) {
      res.end(
        JSON.stringify(userData)
      )
      return
    }

    // 未匹配路由,返回404
    res.writeHead(404, {
      "Content-type": "text/plain"
    })
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle
// process.env.NODE_ENV