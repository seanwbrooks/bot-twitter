var cron = require('node-cron');
import worker from './worker.js';
import twitter from './controllers/twitter';
 
cron.schedule('* * * * *', () => {
  console.log('running a task every minute for likes');
  twitter();
});

cron.schedule('0 * * * *', () => {
  console.log('running a task every hour for statues');
  worker();
});