"use strict";

const client = require('twit');
import { IError } from '../models/error';
import { isAudience } from '../utils/audience';
import { query } from '../utils/timers';

const twitterApi = () => {
    const T = connect();

    const hour = new Date().getUTCHours();
    console.log(query(hour));
    const topic = query(hour);
    
    const tweets : any = getTweets(topic, T);

    if (tweets['statuses']) {
        for (let i = 0; i < tweets['statuses'].length; i++) {
            if (!tweets['statuses'][i].favorited) {
                T.post('favorites/create', { id: tweets['statuses'][i].id_str }, function(err : any, data : any, response : any) {
                    console.log(data);
                });
            }
        }
    }
}

const getTweets = (query : string, T : any) => {
    T.get('search/tweets', { q: query, count: 10 }, function(err : Array<IError>, data : any, response : any) {
        console.log(data);
    });
}

const connect = () => {
    return new client({
        consumer_key:         process.env.KEY,
        consumer_secret:      process.env.SECRET,
        access_token:         process.env.TOKEN,
        access_token_secret:  process.env.TOKEN_SECRET,
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
      });
}


export default twitterApi;

