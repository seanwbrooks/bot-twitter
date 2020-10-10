"use strict";
const fs = require('fs');
const client = require('twit');

const worker = () => {
    const T = new client({
        consumer_key:         process.env.KEY,
        consumer_secret:      process.env.SECRET,
        access_token:         process.env.TOKEN,
        access_token_secret:  process.env.TOKEN_SECRET,
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
      });

    const index =  Math.floor(Math.random() * 10); 

    var img = tweets[index].img["file"];
    console.log(img);
      
    var b64content = fs.readFileSync(`./img/${img}`, { encoding: 'base64' });
 
    // first we must post the media to Twitter
    T.post('media/upload', { media_data: b64content }, function (err : any, data: any) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string;
        var altText = tweets[index].img["alt"];
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
        console.log("media uploaded");
        console.log(data);
        
        T.post('media/metadata/create', meta_params, function (err : any, data : any) {
            if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = { status: tweets[index].text, media_ids: [mediaIdStr] };
            
                T.post('statuses/update', params, function (err : any, data : any) {
                    console.log(data)
                });
            }
        });
    })
}

export default worker;

const tweets = 
[
    {
        "text": `First time homebuyers: \r\n` + 
                `1) Get a preapproval\r\n` +  
                `2) Have a strategy\r\n` +  
                `3) Go to open houses\r\n` + 
                `4) Get an experienced agent\r\n` +  
                `5) Think long term\r\n` +
                `You got this!\r\n` +
                `#realestate #firsttimehomebuyer #homes #mortgage`,
        "img": {
            "file": "condo.jpeg",
            "alt": "Condo with brown siding and porches on lovely day."
        }
    },
    {
        "text": `Healthy meals cooked at home can save you money, ` +
        `increase your productivity, and keep you living a long and ` +
        `happy life.\r\n My favorite garlic, lemon stuffed trout!\r\n ` +
        `What's your go to meal?\r\n` +
        `#healthyliving #productivity #health #recovery`,
        "img": {
            "file": "homecooking.jpg",
            "alt": "Good looking guy smiling with a sheet of stuffed trout."
        }
    },
    {
        "text": `Most important trait to being successful is being proactive!\r\n` +
        `7 Habits of Highly Effective People by @StephenRCovey is a great read for leaders and managers.\r\n` +
        `Don't let things happen to you, be the thing that happens to the world!\r\n` +
        `#highlyeffective #leadership #productivity #goals #success`,
        "img": {
            "file": "",
            "alt": ""
        }
    },
    {
        "text": `Be Proactive\r\n` +
        `Begin with the end in mind\r\n` +
        `Put first things first\r\n` +
        `Think win-win\r\n` +
        `Seek first to understand, then to be understood\r\n` +
        `Synergize\r\n` +
        `Sharpen the saw\r\n`,
        "img": {
            "file": "",
            "alt": ""
        }
    },
    {
        "text": "https://www.youtube.com/watch?v=ktlTxC4QG8g&list=PLePFb3rlFbw7geOapCnmUMKq7ylmEQXcL&index=2&t=0s",
        "img": {
            "file": "",
            "alt": ""
        }
    },
    {
        "text": `You can choose a life of ease and comfort or you can choose a life of service and adventure.\r\n` +
        `#success #growthmindset #entrepreneurship #service #gratitude`,
        "img": {
            "file": "",
            "alt": ""
        }
    },
    {
        "text": "Experiences change your life. The time I took to live as a hiker, homeless with " +
        "everything I owned on my back was revolutionary!\r\n" +
        "Hiking from Georgia to Maine.\r\n" +
        "#appalachiantrail #outsidethenorm #success #adventure #unknown",
        "img": {
            "file": "appalachiantrail.jpg",
            "alt": "Katahdin Sign with four hikers."
        }
    },
    {
        "text": "Have a lovely day!\r\n #lovelyday #blessed #thankful #gratitude #happy",
        "img": {
            "file": "",
            "alt": ""
        }
    },
    {
        "text": "You matter, so pay yourself first.\r\n  I do this by automatically pulling 30% of my paycheck every month" +
        " and putting 5% into a high yield savings account and 25% in a brokerage account that invests in mutual " +
        "funds.\r\n Start here: https://investor.vanguard.com/home\r\n" +
        "#investing #moneytips #mutualfunds @Vanguard #payyourselffirst",
        "img": {
            "file": "",
            "alt": ""
        }
    },
    {
        "text": "Is there a habit that you do that keeps you excited about life?\r\n" +
        "I'm thinking about having a habit of jumping in the ocean each month...\r\n" +
        "#productivity #ocean #swimming #habits #atomichabits #refreshing",
        "img": {
            "file": "oceanswimming.MOV",
            "alt": "Sean Brooks jumping into the ocean."
        }
    }
];