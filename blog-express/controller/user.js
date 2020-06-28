const { exec, escape } = require('../db/mysql');
const { setPassword } = require('../utils/crypto');

const login = async (username, password) => {
  password = setPassword(password);
  const sql = `select * from user where username=${escape(username)} and password=${escape(password)};`;
  let res = await exec(sql);
  return res[0] || {};
}

module.exports = {
  login
}