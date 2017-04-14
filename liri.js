//Place command line arguments in an array

var nodeArgs = process.argv;
var liriOption = nodeArgs[2];

//Initialize packages 
var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var keyData = require('./keys.js');

//function to fetch & display tweets using the Twitter API

function getTweets (tweetCount) {

	var client = new Twitter({
	  consumer_key: keyData.twitterKeys.consumer_key,
	  consumer_secret: keyData.twitterKeys.consumer_secret,
	  access_token_key: keyData.twitterKeys.access_token_key,
	  access_token_secret: keyData.twitterKeys.access_token_secret
	});

	client.get('statuses/user_timeline', {count: tweetCount}, function(error, tweets, response) {
	if (error) throw error;

		console.log("\nMy last " + tweetCount + " Tweets:");

		for (let i = 0; i < tweetCount, i++) {

		console.log("\nCreated: " + tweets[i].created_at);
		console.log("Tweet text: " + tweets[i].text);

		} // end for loop

	}); // end Twitter API request

} // end getTweets function

// function to search Spotify for song details

function searchSpotify (trackName, itemNum) {

	spotify.search({ type: 'track', query: trackName }, function(err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
		return;
		}

	// extract the desired song details from the spotify json object

		console.log("\nMy Song:");
		console.log("\nArtist Name: " + data.tracks.items[itemNum].album.artists[0].name);
	 	console.log("Song Name: " + data.tracks.items[itemNum].name);
	 	console.log("Preview URL: " + data.tracks.items[itemNum].preview_url);
	 	console.log("Album Name: " + data.tracks.items[itemNum].album.name);

	 }); // end function to search Spotify

// function to search OMDB using the request package

function searchMovie (flicName) {

		var queryUrl = "http://www.omdbapi.com/?t=" + flicName + "&y=&plot=short&r=json";

		request(queryUrl, function(error, response, body) {

			// check to see if the request is successful
			if (!error && response.statusCode === 200) {

			// then parse the OMDB json object and extract the desired movie details

				console.log("\nMy Movie: ");
	   			console.log("\nTitle: " + JSON.parse(body).Title);
	   			console.log("Year: " + JSON.parse(body).Year);
	   			console.log("Rated: " + JSON.parse(body).Rated);
	   			console.log("Country: " + JSON.parse(body).Country);
	   			console.log("Language: " + JSON.parse(body).Language);
	   			console.log("Plot: " + JSON.parse(body).Plot);
	   			console.log("Actors: " + JSON.parse(body).Actors);
	   			console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
	   			console.log("URL: https://www.rottentomatoes.com/search/?search=" + flicName);

	   		} // end if request successful

   		}); // ending the OMDB query request

} // end function searchMovie

// command handler switch statement

switch (liriOption) {

	case "my-tweets":

		getTweets(20);

	break;

	case "spotify-this-song":

		var songName = "";

		// if song name has more than one word, we concatenate it together with + signs instead of spaces
		// because the spotify api requires the query to be a contiguous string 
			var songName = "";

		if (nodeArgs.length > 3) {
			for (var i = 3; i < nodeArgs.length; i++) {

			  if (i > 3 && i < nodeArgs.length) {

		   		songName = songName + "+" + nodeArgs[i];

		  	  } else {

		   		songName += nodeArgs[i];

	 	 	  } // end if 
			} // end for loop
		
		} else { 

			searchSpotify('the+sign', 3);
			break;

		} // end if nodeArgs > 3

		searchSpotify(songName, 0);

		break;





