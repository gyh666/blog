const http = require('http');
const port = 8000;
const serverHanlde = require('../app');

const server = http.createServer(serverHanlde)
server.listen(port, () => {
  console.log('server is run');
})