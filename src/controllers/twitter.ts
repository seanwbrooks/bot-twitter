"use strict";

const client = require('twit');
const config = require('config');

let process = () => {
    let date = new Date();
    let T = new client({
        consumer_key:         config.get('twitter.key'),
        consumer_secret:      config.get('twitter.secret'),
        access_token:         config.get('twitter.token'),
        access_token_secret:  config.get('twitter.token_secret'),
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
      });
      
    T.get('search/tweets', { q: `#everythingseanb`, count: 5 }, function(err : any, data : any, response : any) {
        for (let i = 0; i < data['statuses'].length; i++) {
            let tweet_id : string = data['statuses'][i]['id_str'];
            T.post('statuses/retweet/:id', { id: tweet_id }, function(err : any, data : any, response : any) {
                console.log(err);
            });
        }
    });
      
};

export default process;
 
// const twitterApi = () => {
//     console.log("Twitter api pull for hashtag");
// }
// setInterval(twitterApi, 10000);

