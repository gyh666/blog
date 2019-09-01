const env = process.env.NODE_ENV  //获取环境变量
console.log(env)

let MYSQL_CONF

if (env === 'dev') {
  // 本地服务器配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'myblog'
  }
}

if (env === 'production') {
  // 线上服务器配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}