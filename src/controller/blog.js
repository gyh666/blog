// controller文件处理数据相关
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  // 因为author和keyword的值不确定，所以用1=1占位
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createTime desc;`
  return exec(sql)
}

const getDetail = id => {
  const sql = `select * from blogs where id='${id}';`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const { title, author, content } = blogData
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, author, createTime) values ('${title}', '${content}', '${author}', '${createTime}');
  `

  return exec(sql).then(insertData => {
    // console.log(insertData)
    return {
      id: insertData.insertId,
      msg: '创建成功'
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id};
  `

  return exec(sql).then(updateData => {
    console.log(updateData)
    return updateData.affectedRows > 0 ? true : false
  })
}

const deleteBlog = (id, author) => {
  // 实际开发中可能会使用软删除
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then(deleteData => {
    return deleteData.affectedRows > 0 ? true : false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}