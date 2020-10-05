var cron = require('node-cron');
var worker = require('./worker.js');
 
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  worker();
});