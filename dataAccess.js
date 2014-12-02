
var mongo = require('mongojs');
var fs = require('fs');

var configObject = JSON.parse(fs.readFileSync('configs.json'));
var db = mongo(configObject.database.connectionString, ["audios"]);

// words: array of string
exports.addWords = function addWords (words) {

}

// word: string
exports.getCountForWord = function getCountForWord (word) {

}

exports.getAllWords = function getAllWords () {

}