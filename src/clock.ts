var cron = require('node-cron');
import { worker } from './worker';
 
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  worker;
});