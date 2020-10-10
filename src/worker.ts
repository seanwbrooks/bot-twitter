const fs = require('fs');

const worker = () => {
    const T = new client({
        consumer_key:         process.env.KEY,
        consumer_secret:      process.env.SECRET,
        access_token:         process.env.TOKEN,
        access_token_secret:  process.env.TOKEN_SECRET,
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
      });

    var img = tweets[0].img["file"];
    console.log(img);
      
    var b64content = fs.readFileSync(`/img/${img}`, { encoding: 'base64' });
 
    // first we must post the media to Twitter
    T.post('media/upload', { media_data: b64content }, function (err : any, data: any) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string;
        var altText = tweets[0].img["alt"];
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
        console.log("media uploaded");
        console.log(data);
        
        T.post('media/metadata/create', meta_params, function (err : any, data : any) {
            if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = { status: tweets[0].text, media_ids: [mediaIdStr] };
            
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
        "text": `First time homebuyers: ` + 
                `1) Get a preapproval` +  
                `2) Have a strategy` +  
                `3) Go to open houses` + 
                `4) Get an experienced agent` +  
                `5) Think long term` +
                `#realestate #firsttimehomebuyer #homes #mortgage`,
        "img": {
            "file": "condo.jpeg",
            "alt": "Condo with brown siding and porches on lovely day."
        }
    }
];