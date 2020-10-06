"use strict";

const client = require('twit');
import { IError } from '../models/error';
import { isAudience } from '../utils/audience';
import { query } from '../utils/timers';

const twitterApi = () => {
    try {
        const T = new client({
            consumer_key:         process.env.KEY,
            consumer_secret:      process.env.SECRET,
            access_token:         process.env.TOKEN,
            access_token_secret:  process.env.TOKEN_SECRET,
            timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
            strictSSL:            true,     // optional - requires SSL certificates to be valid.
          });
    
        const hour = new Date().getUTCHours();
        const topic = query(hour);
        
        console.log("seaching for " + topic);
        T.get('search/tweets', { q: topic, count: 100, language: 'en' }, function(err : Array<IError>, data : any) {
            if (data['statuses']) {
                for (let i = 0; i < data['statuses'].length; i++) {
                    if (!data['statuses'][i].possibly_sensitive) {
                        T.post('favorites/create', { id: data['statuses'][i].id_str }, function(err : any, data : any) {});
                    }
                }
            }
        });
    } catch (err) {
        console.log("Error: " + err);
    }
}

export default twitterApi;

