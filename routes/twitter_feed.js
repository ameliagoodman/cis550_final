var tweets;

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log("in here");
    tweets = (data);
};

var Twitter = require('twitter-node-client').Twitter;

//Create a new Twiter connection using the cis550project app
var twitter = new Twitter({
    "consumerKey": "S2iGbO2h5gl2sXTpH43ZgwRrx",
    "consumerSecret": "NtRt1OuNipHtXiFHrHStU7c606bY4t6RS3i85tj5B59dQybfx0",
    "accessToken": "228834065-Jix3tzKNs43ATEeOhmZm4RiVMpvwsOZ3dIY5wJ3j",
    "accessTokenSecret": "F4OO64EKQ8LZfjf35rfsBxgKtQkBiq6NkCPbG8V2HCDRB",
    "callBackUrl": "localhost:8080"
});

//
// Get 100 most recent tweets containing the hashtag olympics and doping that are in english
//
function searchOlympics(res) {
    twitter.getSearch({'q':'#olympics #doping lang:en','count': 100}, error, function(data) {
        data = JSON.parse(data);
        var tweets = [];
        var tweetIDs = [];
        // get id's and tweet content for each tweet in data
        for (var i = 0; i < data['statuses'].length; i++) {
            tweetIDs.push(data['statuses'][i]['id'].toString());
            var new_tweet = {};
            new_tweet['name'] = data['statuses'][i]['user']['name'];
            new_tweet['text'] = data['statuses'][i]['text'];
            tweets.push(new_tweet);
        };
        res.render('twitter_feed.jade',
            { title: "What is the world saying?",
              searchOlympics: tweetIDs
            }
        );
    });
}


/////
// This is what's called by the main app
exports.do_work = function(req, res){
    searchOlympics(res);
};
