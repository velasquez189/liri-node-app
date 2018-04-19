require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var burden = process.argv[2];
var userRequest = process.argv[3];

switch (burden) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    // case "movie-this":
    //     movieThis();
    //     break;
    // case "do-what-it-says":
    //     doWhatItSays();
    //     break;
    default:
        console.log("Are you an API if you're jQuerying your mother?")
}

function myTweets() {
    var params = {
        screen_name: 'velasquez160189',
        count: 10,
        result_type: 'recent',
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (let i = 0; i < tweets.length; i++) {
                var number = i + 1;
                var text = tweets[i].text;
                var timeStamp = tweets[i].created_at;

                console.log("\n" + number + "." + "\n-------------------------")
                console.log(text);
                console.log(timeStamp);
            }
        }
    });
}

function spotifyThisSong() {
    if (!userRequest) {
        spotify.search({ type: 'track', query: "The Sign Ace of Base" }, function (err, data) {
          
          
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);



        })
    } else {
        spotify.search({ type: 'track', query: userRequest }, function (err, data) {
           
           
           
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
        });


    }
















}