require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdbApi = require('omdb-client');
var keys = require('./keys.js');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var burden = process.argv[2];
var userRequest = process.argv[3];


handleCommands();
function handleCommands(){
    switch (burden) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Are you an API if you're jQuerying your mother?")
    }
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

function movieThis() {

    var params = {
        apiKey: 'trilogy',
        title: userRequest,
    }
    function consoleLogMovie(data){
        console.log("Title: ", data.Title);  
        console.log("Year: ", data.Year);  
        console.log("Rating: ", data.imdbRating);  
        console.log("Rotten Tomatoes Rating: ",data.Ratings[1].Value);  
        console.log("Country: ", data.Country);  
        console.log("Language: ", data.Language);  
        console.log("Plot: ", data.Plot);  
        console.log("Actors: ", data.Actors);  
    }
    omdbApi.get(params, function(err, data) {
        if(!userRequest || err){
            params.title = "Mr. Nobody";
            omdbApi.get(params, function(err, data) {
            consoleLogMovie(data);
                
            })
        }else{
           consoleLogMovie(data);
        }
        

    });

}
function doWhatItSays (){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(",");
        
        burden = dataArr[0];
        userRequest = dataArr[1];
        handleCommands();
    });
}








