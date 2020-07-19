/*
 * @Description: 
 * @Version: 
 * @Author: 
 * @Date: 2020-07-19 21:24:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-19 23:51:21
 */ 
const { ErrorModel } = require('../model/resModel');
// 检验是否登录
const checkLogin = async (ctx, next) => {
  ctx.session.username ? await next() : ctx.body = new ErrorModel('尚未登录', 401);
}

module.exports = {
  checkLogin
}
