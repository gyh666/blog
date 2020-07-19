const { exec, escape } = require('../db/mysql');
const { setPassword } = require('../utils/crypto');
const xss = require('xss');

const login = async (username, password) => {
  password = setPassword(password);
  const sql = `select * from user where username=${escape(xss(username))} and password=${escape(xss(password))};`;
  let res = await exec(sql);
  return res[0] || {};
}

module.exports = {
  login
}