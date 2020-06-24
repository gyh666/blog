const qs = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { setCookieExpires } = require('./src/utils');
const { access } = require('./src/utils/log');
const moment = require('moment');

const SESSION = {};

const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') return resolve({});
    if (req.headers['content-type'] !== 'application/json') return resolve();
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      resolve(postData ? JSON.parse(postData) : {});
    });
  });
}

const serverHandle = async (req, res) => {
  // 记录 access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${moment().format('YYYY-MM-DD hh:mm:ss')}`);
  res.setHeader('Content-type', 'application/json');
  req.path = req.url.split('?')[0];
  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    if (!item) return;
    const arr = item.split('=');
    req.cookie[arr[0]] = arr[1];
  });
  // 解析 session
  let needCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (!SESSION[userId]) SESSION[userId] = {};
  } else {
    needCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION[userId] = {};
  }
  req.session = SESSION[userId];
  // 解析 get query
  req.query = qs.parse(req.url.split('?')[1]);
  // 解析 post data
  req.body = await getPostData(req);

  // 处理 blog 路由
  const blogData = await handleBlogRouter(req, res);
  if (blogData) {
    if (needCookie) res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${setCookieExpires()}`);
    res.end(JSON.stringify(blogData));
    return;
  }
  // 处理 user 路由
  const userData = await handleUserRouter(req, res);
  if (userData) {
    if (needCookie) res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${setCookieExpires()}`);
    res.end(JSON.stringify(userData));
    return;
  }
  // 404
  res.writeHeader(404, {
    "Content-type": "text/plain"
  });
  res.write("404 Not Found\n");
  res.end();
};
module.exports = serverHandle;