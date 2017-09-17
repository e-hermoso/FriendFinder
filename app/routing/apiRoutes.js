// This is apiRoutes.js
// Dependencies
// ===========================================================
var friendsJson = require('../data/friends.js');

// Routes
// ===========================================================
module.exports = function(app){
	app.get('/api/friends', function(req, res) {
	  res.json(friendsJson);
	  // var friends = req.query.friendsJson
	  for(i = 0; i < friendsJson.length; i++){
	  	console.log(friendsJson[i].name);
	  	// console.log(friends);
		}
	});
	// A POST routes /api/friends. This will be used to handle incoming survey results.
	// This route will also be used to handle the compatibility logic.
	// Determine the user's most compatible friend using the following as a guide:
	// With that done, compare the difference between current user's scores against those from other users,
	// question by question. Add up the differences to calculate the totalDifference
	app.post('/api/friends', function(req, res) {
		var totalDifference = 0;
		var newFriend = req.body;
		var indexOfMatch;
		friendsJson.push(newFriend);
		// console.log(friendsJson[0].scores);

		// Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
		var newFriendScores = newFriend.scores;
		newFriendScores = newFriendScores.map(Number);

		var sumFriend = newFriendScores.reduce((x, y) => x + y);

		// console.log(sumFriend);
		// console.log(newFriendScores);
		var matchDifArray = [];

		for(var i = 0; i < friendsJson.length-1; i++){
			var matchScores = friendsJson[i].scores;// console.log("Before map number: " + matchScores); ex 4,5,1,5,3,5,3,4,3,3
			matchScores = matchScores.map(Number);
			console.log(matchScores);
			var sumMatch = matchScores.reduce((x, y) => x + y);
			totalDifference = sumFriend - sumMatch;
			totalDifference = Math.abs(totalDifference);
			matchDifArray.push(totalDifference);
		}
		console.log(matchDifArray);
		var min = Math.min.apply(Math, matchDifArray);
		indexOfMatch = matchDifArray.indexOf(min);
		res.json(friendsJson[indexOfMatch]);
		console.log(friendsJson[indexOfMatch].photo);

	});
};
