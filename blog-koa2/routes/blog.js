/*
 * @Description: 
 * @Version: 
 * @Author: 
 * @Date: 2020-07-08 22:51:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-20 00:08:26
 */ 
const router = require('koa-router')()

const { getList, getDeatail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { checkLogin } = require('../middleware/loginCheck');

// 根路径
router.prefix('/api/blog')

/**
 * @name: 获取博客列表
 * @methods: GET
 * @params:   
 * @return: 
 */
router.get('/list', async (ctx, next) => {
  const { author = '', keyword = '' } = ctx.query;
  if (ctx.query.isAdmin) {
    author = ctx.session.username;
    if (ctx.session.username == null) return ctx.body = new ErrorModel('未登录');
    author = ctx.session.username;   //强制查询自己的博客
  }
  const result = await getList(author, keyword);
  return result.length ? ctx.body = new SuccessModel(result, '获取成功') : ctx.body = new ErrorModel('获取失败');
});

/**
 * @name: 获取博客详情
 * @methods: GET
 * @params:   
 * @return: 
 */
router.get('/detail', async (ctx, next) => {
  const id = ctx.query.id;
  const result = await getDeatail(id);
  return result.length ? ctx.body = new SuccessModel(result[0], '获取博客成功') : ctx.body = new ErrorModel('获取博客失败');
});

/**
 * @name: 新建一篇博客
 * @methods: POST
 * @params:   
 * @return: 
 */
router.post('/new', checkLogin, async (ctx, next) => {
  const body = ctx.request.body;
  body.author = ctx.session.username;
  const result = await newBlog(body);
  return result ? ctx.body = new SuccessModel('新建博客成功') : ctx.body = new ErrorModel('新建博客失败');
});

/**
 * @name: 修改博客
 * @methods: POST
 * @params:   
 * @return: 
 */
router.post('/update', checkLogin, async (ctx, next) => {
  const result = await updateBlog(ctx.query.id, ctx.request.body);
  return result ? ctx.body = new SuccessModel('更新博客成功') : ctx.body = new ErrorModel('更新博客失败');
});

/**
 * @name: 删除博客
 * @methods: POST
 * @params:   
 * @return: 
 */
router.post('/delete', checkLogin, async (ctx, next) => {
  const author = ctx.session.username;
  const result = await deleteBlog(ctx.query.id, author);
  return result ? ctx.body = new SuccessModel('删除博客成功') : ctx.body = new ErrorModel('删除博客失败');
});

module.exports = router
