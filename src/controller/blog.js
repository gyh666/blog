// controller文件处理数据相关

const getList = (author, keyword) => {
  // 返回数据格式
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1567218466988,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1567218542321,
      author: 'lisi'
    }
  ]
}

const getDetail = id => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1567218466988,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  console.log('new Blog:', blogData)
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  console.log('updateBlog', blogData)
  return true
}

const deleteBlog = id => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}