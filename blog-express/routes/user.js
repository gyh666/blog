var express = require('express');
var router = express.Router();

const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  let result = await login(username, password);
  if (result.username) {
    // req.session.username = result.username;
    // req.session.realname = result.realname;
    // 同步到 redis
    // setRedis(req.cookie.userid, req.session);
    return res.json(new SuccessModel(result[0], '登录成功'));
  } else {
    return res.json(new ErrorModel('登录失败'));
  }
});

module.exports = router;
