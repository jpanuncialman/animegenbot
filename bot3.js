//Node Requires
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var stream = T.stream('user');

//Scrape data
var scrape = require('./downloads/animelist-sample.json');
var scrapeTwo = require('./downloads/animelist-sample2.json');
var scrapeThree = require('./downloads/animelist-sample3.json');
var scrapeFour = require('./downloads/animelist-sample4.json');


//Title and Summary Vars
var titles = scrape["animeTitle"].concat(scrapeTwo["animeTitle"]).concat(scrapeThree["animeTitle"]).concat(scrapeFour["animeTitle"]);
var summaries = scrape["animeDescr"].concat(scrapeTwo["animeDescr"]).concat(scrapeThree["animeDescr"]).concat(scrapeFour["animeDescr"]);
var titleStart = [];
var summStart = [];
var titleEnd = {};
var summEnd = {};
var wordPossibilities = {};
var summPossibilities = {};
var order = 2;

//Tweet Vars
var tweetTitle;
var tweetSumm;
var tweet;




/*

*** Titles ***

*/
for (var i = 0; i < titles.length; i++) {
	var words = titles[i].split(" ");
	titleStart.push(words[0]);
	titleEnd[words[words.length - 1]] = true;


	for (var j = 0; j < words.length - 1; j++) {
		if (!wordPossibilities.hasOwnProperty(words[j])) {
			wordPossibilities[words[j]] = [words[j + 1]];
		} else {
			wordPossibilities[words[j]].push(words[j + 1]);
		}
	}
}


//Generate Titles from scrapes
function generateTitle(limit) {
	word = choice(titleStart);
	var title = [word];

	while (wordPossibilities.hasOwnProperty(word)) {
		var nextWord = wordPossibilities[word];
		word = choice(nextWord);
		title.push(word);
		if (title.length > limit && titleEnd.hasOwnProperty(word)) break;
	}
	if (title.length < limit) return generateTitle(limit);

	return title.join(' ');
}




/*

*** Descriptions ***

*/

for (var i = 0; i < summaries.length; i++) {
	var words = summaries[i].match(/\b[\w']+(?:[^\w\n]+[\w']+){0,1}\b/g);
	// var words = summaries[i].split(" ");
	if (words) {
		summStart.push(words[0]);
		summEnd[words[words.length - 1]] = true;


	for (var j = 0; j < words.length - 1; j++) {
		if(!summPossibilities.hasOwnProperty(words[j])) {
			summPossibilities[words[j]] = [words[j + 1]];
		} else {
			summPossibilities[words[j]].push(words[j + 1]);
		}
	}
	}

}


//Generate Descriptions from scrapes
function generateSumm(limit) {
	word = choice(summStart);
	var summ = [word];

	summPossibilities = removeFillerWords(summPossibilities);

	while (summPossibilities.hasOwnProperty(word)) {
		var nextWord = summPossibilities[word];
		word = choice(nextWord);
		summ.push(word);
		if ((summ.length > limit && summEnd.hasOwnProperty(word))) break;
	}
	if (summ.length < limit || summ.join(' ').length >= 270) return generateSumm(limit);
	

	var summOutput = addPunc(summ.join(' ').trim());

	if (noSynopsis(summOutput)) return generateSumm(limit);
	return summOutput;
}





/*

*** Tweeting ***

*/

function generateTweet() {

	tweetTitle = generateTitle(2 + Math.floor(2 * Math.random()));
	tweetSumm = generateSumm(10 + Math.floor(3 * Math.random()));
	tweet = tweetTitle + " - " + tweetSumm;


	if (tweet.length >= 280) generateTweet();

	return tweet;
}

tweet = generateTweet();

function tweetIt() {
	T.post('statuses/update', { status: tweet }, function(err, data, response) {
	  if(err) {
	  	console.log("Oh no, an error!");
	  	console.log(err, data, response);
	  } else {
	  	console.log("It worked!")
	  	console.log(data);
	  }
	})
}

//Responding to follows
stream.on('follow', followed);

function followed(eventMsg) {
	console.log("Ya got followed.")
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	followedTweetBack('Thanks for the follow @' + screenName + '. Enjoy your garbage anime.');
}

function followedTweetBack(msg) {
	T.post('statuses/update', { status: msg }, function(err, data, response) {
	  if(err) {
	  	console.log("Oh no, an error!");
	  } else {
	  	console.log("It worked!");
	  }
	})
}


console.log(tweet);
console.log(tweet.length);


setInterval(tweetIt, 1000*21600);


/*

*** Helper Functions ***

*/

//Choose a random starting word
function choice(arr) {
	var i = Math.floor(arr.length * Math.random());
	return arr[i];
}


//Remove parenthesis, brackets, and curly braces.
// function trimWords(arr) {
// 	return arr.map(function(element){
// 		if (element != undefined) {
// 			return element.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
// 		} else {
// 			return element;
// 		}
// 	})
// }

//Disregard descriptions reading "No synopsis yet"
function noSynopsis(str) {
	if (str.includes("No synopsis yet"))
	return true;
}

//Add puncutation to sentences without it
function addPunc(str) {
	var lastChar = str.charAt(str.length - 1);

	if (lastChar != '.'|'?'|'!') {
		str += '.';
	}
	return str;
}

//Remove source words
function removeFillerWords(obj) {
	var mal = "MAL";
	var ann = "ANN";
	var source = "Source";
	var crunchyroll = "Crunchyroll"
	var viz = "Viz";

	for (var prop in obj) {

		for (var i = 0; i < obj[prop].length; i++) {
			if (obj[prop][i] == mal || obj[prop][i] == ann || obj[prop][i] == source || obj[prop][i] == crunchyroll || obj[prop][i] == viz ) {
				obj[prop].splice(i, 1);
			}
		}

	}
	return obj;
}
