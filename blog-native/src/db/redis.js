// const redis = require('redis');
// const { REDIS_CONFIG } = require('../config/db');

// const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
// redisClient.on('error', err => {
//   console.log(err)
// });

// const setRedis = (key, val) => {
//   if (typeof val === 'object') val = JSON.stringify(val);
//   redisClient.set(key, val, redis.print);
// }
// const getRedis = key => {
//   return new Promise((resolve, reject) => {
//     redisClient.get(key, (err, val) => {
//       if (err) return reject();
//       // if (!val) return resolve(null);
//       if (typeof val === 'object') val = JSON.parse(val);
//       resolve(val);
//       // redisClient.quit();
//     })
//   });
// }


// module.exports = {
//   setRedis,
//   getRedis
// }