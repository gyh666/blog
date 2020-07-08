const router = require('koa-router')()
// 根路径
router.prefix('/api/blog')
// 获取博客列表
router.get('/list', async (ctx, next) => {
  const query = ctx.query
  ctx.body = {
    code: 0,
    query,
    data: "获取博客列表"
  }
})

module.exports = router
