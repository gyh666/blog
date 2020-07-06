const { exec } = require('../db/mysql');
const xss = require('xss');

const getList = (author, keyword) => {
  let sql = `select * from blog where 1=1 `;
  if (author) sql += `and author='${author}' `;
  if (keyword) sql += `and title like '%${keyword}%' `;
  sql += `order by createTime desc;`;
  return exec(sql);
};

const getDeatail = id => {
  const sql = `select * from blog where id=${escape(id)};`;
  return exec(sql);
}

const newBlog = async data => {
  const { title, content, author = '张三', description = '' } = data;
  const createTime = Date.now();
  const sql = `insert into blog(title, author, description, content, createTime) values ('${xss(title)}', '${xss(author)}', '${xss(description)}', '${xss(content)}', ${createTime});`;
  let res = await exec(sql);
  return res.insertId;
}

const updateBlog = async (data = {}) => {
  const { id, title, content, author, description = '' } = data;
  const createTime = Date.now();
  const sql = `update blog set title='${xss(title)}', content='${xss(content)}', author='${xss(author)}', createTime=${createTime}, description='${xss(description)}' where id=${escape(id)};`;
  let res = await exec(sql);
  return res.changedRows;
}

const deleteBlog = async id => {
  const sql = `delete from blog where id=${escape(id)}`;
  let res = await exec(sql);
  return res.affectedRows;
}

module.exports = {
  getList,
  getDeatail,
  newBlog,
  updateBlog,
  deleteBlog,
}