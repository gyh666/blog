const loginCheck = (username, password) => {
    return username === 'zhangsan' && password === 1234 ? true : false
}

module.exports = {
  loginCheck
}