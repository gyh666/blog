var express = require('express');
var router = express.Router();

const { getList, getDeatail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { checkLogin } = require('../utils/index');

/* 获取博客列表 */
router.get('/list', async (req, res, next) => {
  const { author = '', keyword = '' } = req.query;
  const result = await getList(author, keyword);
  return result.length ? res.json(new SuccessModel(result, '获取成功')) : res.json(new ErrorModel('获取失败'));
});

/* 获取博客详情 */
router.get('/detail', async (req, res, next) => {
  const id = req.query.id;
  const result = await getDeatail(id);
  return result.length ? res.json(new SuccessModel(result[0], '获取成功')) : res.json(new ErrorModel('获取失败'));
});

/* 新建一篇博客 */
router.post('/new', async (req, res, next) => {
  // if (!checkLogin(req)) {
  //   return res.json(new ErrorModel('尚未登录'));
  // }
  // req.body.author = req.session.username;
  const result = newBlog(req.body);
  return result ? res.json(new SuccessModel('新建成功')) : res.json(new ErrorModel('新建失败'));
});

/* 修改博客 */
router.post('/update', async (req, res, next) => {
  // if (!checkLogin(req)) {
  //   return res.json(new ErrorModel('尚未登录'));
  // }
  const result = updateBlog(req.body);
  return result ? res.json(new SuccessModel('更新成功')) : res.json(new ErrorModel('更新失败'));
});

/* 删除博客 */
router.post('/delete', async (req, res, next) => {
  // if (!checkLogin(req)) {
  //   return res.json(new ErrorModel('尚未登录'));
  // }
  const result = deleteBlog(req.body.id);
  return result ? res.json(new SuccessModel('删除成功')) : res.json(new ErrorModel('删除失败'));
});

module.exports = router;
