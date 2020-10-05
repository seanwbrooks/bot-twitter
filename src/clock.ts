var cron = require('node-cron');
var worker = require('./worker');
 
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  worker;
});