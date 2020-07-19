/*
 * @Description: user 路由模块
 * @Version: 1.0.0
 * @Author: gyh
 * @Date: 2020-07-08 22:51:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-20 00:15:35
 */ 
const router = require('koa-router')()
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 根目录
router.prefix('/api/user')

/**
 * @name: 用户登录
 * @methods: POST
 * @params: 
 * @return: 
 */
router.post('/login', async (ctx, next) => {
  console.log(ctx.request);
  const { username, password } = ctx.request.body;
  // console.log(username, password);
  let result = await login(username, password);
  if (result.username) {
    ctx.session.username = result.username;
    ctx.session.realname = result.realname;
    return ctx.body = new SuccessModel(result[0], '登录成功');
  } else {
    return ctx.body = new ErrorModel('登录失败');
  }
});

// 测试 session
router.get('/login-test', async (ctx, next) => {
  if (ctx.session.viewCount == null) ctx.session.viewCount = 0
  ctx.session.viewCount++
  ctx.body = {
    code: 200,
    viewCount: ctx.session.viewCount
  }
})

module.exports = router
