const env = process.env.NODE_ENV; // 环境参数
let MYSQL_CONFIG/*,  REDIS_CONFIG */;
if (env === 'prod') {
  MYSQL_CONFIG = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'blog'
  }
  // REDIS_CONFIG = {
  //   host: '127.0.0.1',
  //   port: 6379
  // }
} else {
  MYSQL_CONFIG = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'blog'
  }
  // REDIS_CONFIG = {
  //   host: '127.0.0.1',
  //   port: 6379
  // }
}
module.exports = {
  MYSQL_CONFIG,
  // REDIS_CONFIG
}