//Variables
var Twit = require('twit');
var tracery = require('tracery-grammar');
var config = require('./config');
var scrape = require('./downloads/animelist-sample.json');
var T = new Twit(config);


//Title and Summary Vars
var animeTitles = scrape["animeTitle"];
var animeSummaries = scrape["animeDescr"];
// var animeTitlesNew = {};
// var animeSummariesNew = [];

//Order
var order = 6;




// //Remove blanks from Array

// function splitBlanks(arr) {
// 	var output = arr.toString().split(',,');

// 	return output.map(function(elem){
// 		return elem.split(',').filter(function(x){

// 		});
// 	});

	
// }


// function generateTitle(titleList) {
	
// 	splitBlanks(titleList);


// 	for (var i = 0; i < titleList.length; i++) {
// 		var gram = titleList[i];
		
// 		if (!animeTitlesNew[gram]) {
// 			animeTitlesNew[gram] = [];
// 		}
// 		animeTitlesNew[gram].push(titleList[i + 1]);
// 	}
	
// 	return animeTitlesNew;
// }

// function markovMagic(titleList) {
// 	var titleListNew = generateTitle(titleList);
// 	var titleKeys = Object.keys(titleListNew).filter(function(x){
// 		return x !== (undefined || null || '');
// 	});


// 	for (i = 0; i <= Math.floor(Math.random() * order); i++) {
// 		var currentGram = titleListNew[titleKeys[titleKeys.length * Math.random() << 0 ]].toString();
// 		var possibilities = titleListNew[currentGram.toString()];
// 		var result = currentGram;
// 		var next = possibilities[Math.floor(this.length * Math.random())];

		
// 		if (next != titleListNew.hasOwnProperty() || next == undefined || '') {
// 			currentGram = titleListNew[titleKeys[titleKeys.length * Math.random() << 0 ]].toString();
// 			result = result + " " + currentGram;
// 		} else {
// 			result = result + " " + next;
// 		}
// 	}
// 	//Generate Titles
// 	// while(titleListNew[result] != null)
// 	// {
// 	// 	var next = possibilities[Math.floor(possibilities.length * Math.random())];
// 	// 	return result = result + " " + next;
// 	// }

// 	// if(titleListNew[result] == null) {
// 	// 	return result;
// 	// }

	
// 	return result;
// }


// console.log(markovMagic(animeTitles));

