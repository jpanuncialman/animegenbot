var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var port = 8000;

var url = "https://myanimelist.net/anime/season";
var destination = fs.createWriteStream('./anime.json');

request(url, function(err, resp, body){
	var $ = cheerio.load(body);
	// var animeName = $('.title-text');
	// var animeNameText = animeName.text();


	//Gets the first

	// $('.title-text').filter(function(){
	// 	var animeName = $(this);
	// 	animeNameText = animeName.text();
	// })

	var animeName = $('.title-text');
	var animeNameText = animeName.text();
	var animeSummary = $('.synopsis');
	var animeSummaryText = animeSummary.text();


	var anime = {
		animeName: animeNameText,
		animeSummary: animeSummaryText
	}

	//console.log(anime);
	//var json = JSON.stringify(anime);
	fs.writeFile('anime.json', anime);
		console.log("File has been created.")
	})

app.listen(port);
console.log('Server is listening on ' + port);