const fs = require('fs');
const path = require('path');

// 写日志
const writeLog = (ws, log) => {
  ws.write(log + '\n');
}

// 生成 writeStream
const createWriteStream = fileName => {
  const fullName = path.join(__dirname, '../../', 'logs', fileName);
  const ws = fs.createWriteStream(fullName, { flags: 'a' });
  return ws;
}

// 写访问日志
const access = log => {
  const accessWriteStream = createWriteStream('access.log');
  writeLog(accessWriteStream, log);
}

module.exports = {
  access
}