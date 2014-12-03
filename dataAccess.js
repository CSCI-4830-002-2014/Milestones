
var mongo = require('mongojs');
var fs = require('fs');
var linq = require('node-linq').LINQ;

var configObject = JSON.parse(fs.readFileSync('configs.json'));
var db = mongo(configObject.database.connectionString, ["audios"]);


// words: array of { word: <string>, count: <string>, variance: <string> }
exports.addWords = function addWords (words) {

	var currentTime = new Date();

	for(var i = 0; i < words.length; i++) 
	{

		db.audios.update( 
			{ word: words[i].word }, 
			{ $inc: {count: 1}, $addToSet: { variance: words[i].variance }, $set: { modifiedOn: currentTime }},
			{ upsert : true } );

	}

}

// word: string
exports.getWordInfo = function getCountForWord (word, callback) {

	return db.audios.findOne( { word: word }, callback);

}

exports.getTopWords = function getTopWords(max, callback) {

	db.audios.find().limit(max).sort( { count: -1 } ).toArray(callback);

}

exports.getRecentWords = function getRecentWords(max, period, callback) {

	var startTime = new Date();

	startTime.setSeconds( startTime.getSeconds() - period );

	db.audios.find( { "modifiedOn": { "$gte": startTime } } ).limit(max).sort( { "modifiedOn":-1 } ).toArray(callback);

}

exports.getAllWords = function getAllWords (callback) {

	db.audios.find().toArray(callback);

}