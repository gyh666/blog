// 设置 cookie 的过期时间
const setCookieExpires = (n = 1) => {
  const d = new Date();
  d.setTime(d.getTime() + (Number(n) * 24 * 60 * 60 * 1000));
  return d.toGMTString();
}

module.exports = {
  setCookieExpires
}