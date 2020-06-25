### 项目介绍

基于原生 `nodejs + mysql + redis` 开发的博客系统，利用nginx配置代理，实现了简单的用户注册登录，以及博客增删改查等功能。登录是对用户 id 进行 cookie、session 的存储，利用 redius 进行同步从而保存用户的状态。运用 stream 对访问日志、错误日志以及事件日志进行读写。

### 目录结构
```
|-- blog
    |-- app.js              // 入口文件
    |-- package.json
    |-- readme.md
    |-- bin                 // 系统文件
    |   |-- www.js          // server 配置
    |-- logs                // 日志文件
    |   |-- access.log      // 访问日志
    |   |-- error.log       // 错误日志
    |   |-- event.log       // 事件日志
    |-- src                 // 根路径
        |-- config          // 配置文件
        |   |-- db.js       // mysql 和 redis 配置
        |-- controller      // 控制文件
        |   |-- blog.js     // 博客数据操作
        |   |-- user.js     // 用户数据操作
        |-- db              // 存储配置
        |   |-- mysql.js    // mysql 配置
        |   |-- redis.js    // redis 配置
        |-- model           // 模板
        |   |-- resModel.js // 返回体 模板
        |-- router          // 路由配置
        |   |-- blog.js     // 博客路由
        |   |-- user.js     // 用户路由
        |-- utils           // 工具库
            |-- index.js
            |-- log.js      // 日志操作库
            |-- readline.js      // 日志分析
```