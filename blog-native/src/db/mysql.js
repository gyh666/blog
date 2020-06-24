const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');
// 创建连接对象
const con = mysql.createConnection(MYSQL_CONFIG);
// 开始连接
con.connect();
// 统一执行 sql 函数
const exec = sql => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(res)));
    });
  });
}
// 关闭连接
// con.end()

module.exports = {
  exec
}