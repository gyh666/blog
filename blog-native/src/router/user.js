const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
// const { setRedis } = require('../db/redis');


const handleUserRouter = async (req, res) => {
  const { method, path } = req;
  // 登录接口
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body;
    let result = await login(username, password);
    if (result.username) {
      req.session.username = result.username;
      req.session.realname = result.realname;
      // 同步到 redis
      // setRedis(req.cookie.userid, req.session);
      return new SuccessModel(result[0], '登录成功')
    } else {
      return new ErrorModel('登录失败');
    }
  }

  // 登录验证

};


module.exports = handleUserRouter;