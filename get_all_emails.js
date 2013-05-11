/*
 * makes a list of all emails on lionlinks
 *
 * first download male.htm and female.htm: lionlinks result pages for male and female searches
 */

var fs = require('fs');

var male = fs.readFileSync('male.htm').toString();
var female = fs.readFileSync('female.htm').toString();
var str = male + female;

var matches = str.match(/:[a-zA-Z0-9]+@exeter.edu/g).map(function(match){
	return match.substring(1);
});
console.log(JSON.stringify(matches));
