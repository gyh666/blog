/*
 * @Description: 
 * @Version: 
 * @Author: 
 * @Date: 2020-06-28 21:45:16
 * @LastEditors: 
 * @LastEditTime: 2020-07-19 20:49:16
 */ 
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// 路由列表
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

// express实例
const app = express();
// 日志管理
if (process.env.NODE_ENV !== 'production') {
  // 开发 / 测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// redis
const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
})
// session
app.use(session({
  secret: 'Bugmaker_666#123',     // 密匙
  // 配置 cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000   // 1天过期
  },
  // 配置 redis
  store: sessionStore
}));

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(createError(500))
});

module.exports = app;
