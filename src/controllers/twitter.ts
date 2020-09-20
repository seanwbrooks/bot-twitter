"use strict";

const client = require('twit');
import { IError } from '../models/error';
import { IStatus } from 'status';
import { isAudience } from '../utils/audience';

let twitterApi = () => {
    let T = new client({
        consumer_key:         process.env.KEY,
        consumer_secret:      process.env.SECRET,
        access_token:         process.env.TOKEN,
        access_token_secret:  process.env.TOKEN_SECRET,
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
      });

    // search for financial independence
    // var stream = T.stream('statuses/filter', { track: '#financialindependence', lang: 'en' });
    // stream.on('tweets', (tweets : any) => {
    //    console.log(tweets);
    // });
      
    T.get('search/tweets', { q: `#financialindependence`, count: 5 }, function(err : Array<IError>, data : any, response : any) {
        let statuses : Array<IStatus> = data['statuses'];
        if (statuses) {
            for (let i = 0; i < statuses.length; i++) {
                if (isAudience(statuses[i]) && !statuses[i].favorited) {
                    T.post('favorites/create', { id: statuses[i].id_str }, function(err : any, data : any, response : any) {
                        console.log(data);
                    });
                }
            }
        }
    });
      
};

export default twitterApi;

