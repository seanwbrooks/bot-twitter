"use strict";

const client = require('twit');
const config = require('config');

let twitterApi = () => {
    let date = new Date();
    let T = new client({
        consumer_key:         process.env.KEY,
        consumer_secret:      process.env.SECRET,
        access_token:         process.env.TOKEN,
        access_token_secret:  process.env.TOKEN_SECRET,
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
      });
      
    T.get('search/tweets', { q: `#financialindependence`, count: 5 }, function(err : any, data : any, response : any) {
        if (data['statuses']) {
            for (let i = 0; i < data['statuses'].length; i++) {
                let tweet_id : string = data['statuses'][i]['id_str'];
                if (data['statuses'][i]['retweeted'] !== true) {
                    T.post('favorites/create/:id', { id: tweet_id }, function(err : any, data : any, response : any) {
                        console.log(data);
                    });
                }
            }
        }
    });
      
};

export default twitterApi;
 
// const twitterApi = () => {
//     console.log("Twitter api pull for hashtag");
// }
// setInterval(twitterApi, 10000);

