const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

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
  if (method === 'GET' && req.path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query
    const result = login(username, password)

    return result.then(data => {
      // 操作cookie
      // httpOnly只允许后端修改cookie
      res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
      return data.username ? new SuccessModel() : new ErrorModel('帐号或者密码错误！')
    })
  }
}

module.exports = handleUserRouter