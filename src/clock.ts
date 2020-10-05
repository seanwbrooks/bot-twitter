var cron = require('node-cron');
import { worker } from './worker.js';
import twitter from './controllers/twitter';
 
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  worker;
  twitter;
});