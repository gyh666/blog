var express = require('express');
var router = express.Router();

const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 登录验证
const loginCheck = (req, res, next) => {
  next();
}

/* GET users listing. */
router.post('/login', /* loginCheck, */ async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  let result = await login(username, password);
  if (result.username) {
    req.session.username = result.username;
    req.session.realname = result.realname;
    return res.json(new SuccessModel(result[0], '登录成功'));
  } else {
    return res.json(new ErrorModel('登录失败'));
  }
});

/* test. */
// router.get('/login-test', (req, res, next) => {
//   const flag = req.session.username;
//   return res.json({
//     code: flag ? 200 : 0,
//     msg: flag ? '登录成功' : '登录失败'
//   });
// });

module.exports = router;
