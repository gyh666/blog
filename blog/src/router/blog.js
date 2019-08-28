const handleBlogRouter = (req, res) => {
  const method = req.method

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: '博客列表的接口'
    }
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: '博客详情的接口'
    }
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '新建博客的接口'
    }
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '更新博客的接口'
    }
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    return {
      msg: '删除博客的接口'
    }
  }
}

module.exports = handleBlogRouter