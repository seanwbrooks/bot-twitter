"use strict";

const client = require('twit');
import { IError } from '../models/error';
import { isAudience } from '../utils/audience';
import { finance_time, javascript_time } from '../utils/timers';

let twitterApi = () => {
    let T = new client({
        consumer_key:         process.env.KEY,
        consumer_secret:      process.env.SECRET,
        access_token:         process.env.TOKEN,
        access_token_secret:  process.env.TOKEN_SECRET,
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
      });

    const time = new Date();
      
    if (finance_time(time.getUTCHours(), time.getUTCMinutes()))
    {
        T.get('search/tweets', { q: `#financialindependence`, count: 10 }, function(err : Array<IError>, data : any, response : any) {
            if (data['statuses']) {
                for (let i = 0; i < data['statuses'].length; i++) {
                    if (isAudience(data['statuses'][i]) && !data['statuses'][i].favorited) {
                        T.post('favorites/create', { id: data['statuses'][i].id_str }, function(err : any, data : any, response : any) {
                            console.log(data);
                        });
                    }
                }
            }
        });
    }
    if (javascript_time(time.getUTCHours(), time.getUTCMinutes())) {
        T.get('search/tweets', { q: "#javascript", count: 10 }, function(err : Array<IError>, data : any, response : any) {
            if (data['statuses']) {
                for (let i = 0; i < data['statuses'].length; i++) {
                    if (isAudience(data['statuses'][i]) && !data['statuses'][i].favorited) {
                        T.post('favorites/create', { id: data['statuses'][i].id_str }, function(err : any, data : any, response : any) {
                            console.log(data);
                        });
                    }
                }
            }
        });
    }
      
};

export default twitterApi;

