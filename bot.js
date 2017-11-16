//console.log("Test message.");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);


var params = {
	q: 'Makoto Shinkai since:2011-11-11',
	count: 3
}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
	var tweets = data.statuses;

	for (var i = 0; i < tweets.length; i++) {
		console.log(tweets[i].user.name);
		console.log(tweets[i].user.screen_name);
		console.log(tweets[i].text);
	}
}
