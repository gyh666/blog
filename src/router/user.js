const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { setRedis } = require('../db/redis')

// 设置cookie过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log(d.toGMTString())
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    // const { username, password } = req.query
    const result = login(username, password)

    return result.then(data => {
      if (data.username) {
        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname
        // console.log('req.session is', req.session )
        
        // 同步到 redis中
        setRedis(req.sessionId, req.session)

        return new SuccessModel()
      }
      // // 操作cookie
      // // httpOnly只允许后端修改cookie
      // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
      // return data.username ? new SuccessModel() : new ErrorModel('帐号或者密码错误！')
      return new ErrorModel('登录失败')
    })
  }

  // // 登录验证
  // if (method === "GET" && req.path === "/api/user/login-test") {
  //   console.log(req.session)
  //   if (req.session.username) {
  //     return Promise.resolve(
  //       new SuccessModel({
  //         session: req.session
  //       })
  //     )
  //   }

  //   return Promise.resolve(
  //     new ErrorModel('尚未登录')
  //   )
  // }
}

module.exports = handleUserRouter