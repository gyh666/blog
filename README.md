# nodejs
node project

### blog博客项目

**使用nodemon检测文件变化，自动重启node**

当我们修改代码时，node必须要手动重启，但可以在安装完 nodemon 后来代替 node 来启动应用

安装：

`
npm install -g nodemon 或者 npm install --save-dev nodemon
`

使用：

`
nodemon app.js //启动
nodemon -h //查看帮助
`

**使用cross-env设置环境变量，兼容mac linux 和 windows**

`cross-env是运行跨平台设置和使用环境变量的脚本`

安装：

`npm install --save-dev cross-env`

使用：

 ```
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
 ```
 
 `
NODE_ENV环境变量将由cross-env设置
打印process.env.NODE_ENV === 'production '
 `
