const { ErrorModel } = require('../model/resModel');
// 检验是否登录
const checkLogin = (req, res, next) => {
  req.session.username ? next() : res.json(new ErrorModel('尚未登录', 401));
}

module.exports = {
  checkLogin
}
