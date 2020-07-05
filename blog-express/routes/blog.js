const express = require('express');
const router = express.Router();

const { getList, getDeatail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { checkLogin } = require('../middleware/loginCheck');

/* 获取博客列表 */
router.get('/list', async (req, res, next) => {
  const { author = '', keyword = '' } = req.query;
  if (req.query.isAdmin) {
    author = req.session.username;
  }
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
router.post('/new', checkLogin, async (req, res, next) => {
  // req.body.author = req.session.username;
  const result = newBlog(req.body);
  return result ? res.json(new SuccessModel('新建成功')) : res.json(new ErrorModel('新建失败'));
});

/* 修改博客 */
router.post('/update', checkLogin, async (req, res, next) => {
  const result = updateBlog(req.body);
  return result ? res.json(new SuccessModel('更新成功')) : res.json(new ErrorModel('更新失败'));
});

/* 删除博客 */
router.post('/delete', checkLogin, async (req, res, next) => {
  const result = deleteBlog(req.body.id);
  return result ? res.json(new SuccessModel('删除成功')) : res.json(new ErrorModel('删除失败'));
});

module.exports = router;
