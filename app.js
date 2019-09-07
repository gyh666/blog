// app.js:系统基础功能相关配置
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { setRedis, getRedis } = require('./src/db/redis')

// // session数据
// const SESSION_DATA = {}

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

// 设置cookie过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log(d.toGMTString())
  return d.toGMTString()
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

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(c => {
    if (!c) return
    const arr = c.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()

    req.cookie[key] = val
  });
  
  // // 解析session
  // let needSetCookie = false
  // let userId = req.cookie.userId
  // if (userId) {
  //   if (!SESSION_DATA[userId]) SESSION_DATA[userId] = {}
  //   // req.session = SESSION_DATA[userId]
  // } else {
  //   needSetCookie = true
  //   // 暂时用不重复的值代替
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  //   // req.session = SESSION_DATA[userId]
  // }
  // req.session = SESSION_DATA[userId]
  
  // 使用 redis解析 session
  let needSetCookie = false
  let userId = req.cookie.userId
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化 redis中的 session值
    setRedis(userId, {})
  }
  // 获取 session
  req.sessionId = userId
  getRedis(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      // 初始化 redis中的 session值
      setRedis(req.sessionId, {})
      // 设置 session
      req.session = {}
    } else {
      // 设置 session
      req.session = sessionData
    }
    // console.log('req.session: ', req.sessionId)
    return getPostData(req)
  })
  // 把 getRedis和 getPostData两个 promise连接在一起
  // 处理post data
  .then(postData => {
  // getPostData(req).then(postData => {
    req.body = postData

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    // 处理user路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        res.end(
          JSON.stringify(userData)
        )
      })
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
