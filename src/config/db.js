const env = process.env.NODE_ENV  //获取环境变量
console.log(env)

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  // mysql本地服务器配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123',
    port: 3306,
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  // mysql线上服务器配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123',
    port: 3306,
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}