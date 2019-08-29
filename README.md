# nodejs
node project
+ blog博客项目

使用nodemon检测文件变化，自动重启node



使用cross-env设置环境变量，兼容mac linux 和 windows

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
