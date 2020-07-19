class BaseModel {
  constructor(data, msg, code) {
    if (typeof data === 'string') {
      this.msg = data
      this.code = msg;
      data = null;
      msg = null;
      code = null
    }
    if (data) this.data = data;
    if (msg) this.msg = msg;
    if (code) this.msg = code;
  }
}

class SuccessModel extends BaseModel {
  constructor(data, msg) {
    super(data, msg);
    this.code = this.code || 200;
  }
}

class ErrorModel extends BaseModel {
  constructor(data, msg) {
    super(data, msg);
    this.code = this.code || 0;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}