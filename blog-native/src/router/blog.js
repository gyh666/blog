const { getList, getDeatail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { checkLogin } = require('../utils/index');

const handleBlogRouter = async (req, res) => {
  const { method, path } = req;
  const id = req.query.id || req.body.id;
  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    const res = await getList(author, keyword);
    return res.length ? new SuccessModel(res, '获取成功') : new ErrorModel('获取失败');
  }
  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const res = await getDeatail(id);
    return res.length ? new SuccessModel(res[0], '获取成功') : new ErrorModel('获取失败');
  }
  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    if (!checkLogin(req)) {
      return new ErrorModel('尚未登录');
    }
    req.body.author = req.session.username;
    const res = newBlog(req.body);
    return res ? new SuccessModel('新建成功') : new ErrorModel('新建失败');
  }
  // 修改博客
  if (method === 'POST' && path === '/api/blog/update') {
    if (!checkLogin(req)) {
      return new ErrorModel('尚未登录');
    }
    const res = updateBlog(id, req.body);
    return res ? new SuccessModel('更新成功') : new ErrorModel('更新失败');
  }
  // 删除博客
  if (method === 'POST' && path === '/api/blog/delete') {
    if (!checkLogin(req)) {
      return new ErrorModel('尚未登录');
    }
    const res = deleteBlog(id);
    return res ? new SuccessModel('删除成功') : new ErrorModel('删除失败');
  }
};


module.exports = handleBlogRouter;