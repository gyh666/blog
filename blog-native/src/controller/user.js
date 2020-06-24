const { exec } = require('../db/mysql');

const login = async (username, password) => {
  const sql = `select * from user where username='${username}' and password='${password}';`;
  let res = await exec(sql)
  return res[0] || {};
}

module.exports = {
  login
}