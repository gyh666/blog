// 设置 cookie 的过期时间
const setCookieExpires = (n = 1) => {
  const d = new Date();
  d.setTime(d.getTime() + (Number(n) * 24 * 60 * 60 * 1000));
  return d.toGMTString();
}

// 检验是否登录
const checkLogin = req => {
  return req.session && req.session.username ? true : false;
}

module.exports = {
  setCookieExpires,
  checkLogin
}