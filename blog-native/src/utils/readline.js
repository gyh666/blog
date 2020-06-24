const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 文件名
const fileName = path.join(__dirname, '../../logs', 'access.log');
// 创建 readStream
const rs = fs.createReadStream(fileName);
// 创建 readline 对象
const rl = readline.createInterface({
  input: rs
});

let chromeNum = 0, total = 0;
rl.on('line', d => {
  if (!d) return
  total++;
  let arr = d.split(' -- ');
  if (arr && arr[2].indexOf('Chrome') > 0) {
    chromeNum++
  }
});
rl.on('close', () => {
  console.log(`chrome占比：${ chromeNum / total }`);
});