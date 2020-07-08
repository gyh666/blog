const router = require('koa-router')()
// 根目录
router.prefix('/api/user')
// 登录
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  ctx.body = {
    code: 0,
    username,
    password
  }
})

module.exports = router
