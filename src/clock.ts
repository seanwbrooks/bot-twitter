var cron = require('node-cron');
var worker = require('./worker');
 
cron.schedule('15 * * * *', () => {
  console.log('running a task every minute');
  worker();
});