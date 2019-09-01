class BaseModel {
  constructor(data, message) {
    // 接收两种数据类型（对象和字符串）
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }

    if (data) {
      this.data = data
    }

    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)  // 执行父类的构造函数
    this.error = 0
  }
}

class ErrorModel extends BaseModel {
  constructor (data, message) {
    super(data, message)
    this.error = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}