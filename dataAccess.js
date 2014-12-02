
var mongo = require('mongojs');
var fs = require('fs');
var linq = require('node-linq').LINQ;

var configObject = JSON.parse(fs.readFileSync('configs.json'));
var db = mongo(configObject.database.connectionString, ["audios"]);


// words: array of { word: <string>, count: <string> }
exports.addWords = function addWords (words) {

	for(var i = 0; i < words.length; i++) {

		db.audios.update( { word: words[i].word }, {$inc: {count: words[i].count}}, {upsert:true} );

	}

}

// word: string
exports.getWordInfo = function getCountForWord (word, callback) {

	return db.audios.findOne( { word: word }, callback);

}

exports.getAllWords = function getAllWords (callback) {

	db.audios.find().toArray(callback);

}