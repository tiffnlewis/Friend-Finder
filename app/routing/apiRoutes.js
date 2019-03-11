//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
var friends = require("../data/friends");

module.exports = function(app){
    app.get("/api/friends", function(req, res){
        return res.json(friends);
    });
    
    //Create and save new friends with POST
    app.post("/api/friends", function(req, res){
        var newFriend = req.body;        

        //here we find a match for our new friend profile, initializing with the first friend we have
        var bestMatch = friends[0];
        var lowestRunningDifference = 41;

        //loop through profiles
        friends.forEach(friend => {
            var tallyDifference = 0;
            //loop through each question score
            for(var i = 0; i < friend.scores.length; i++){
                tallyDifference += Math.abs(friend.scores[i] - newFriend.scores[i]);

                if(tallyDifference <= lowestRunningDifference){
                    //we have a new lowest difference, this could be a match made in heaven
                    lowestRunningDifference = tallyDifference;
                    bestMatch = friend;
                }
            }

            
        });
        //api sends back the match
        res.send(bestMatch);
        //lastly add new user to friends array
        friends.push(newFriend);
    });
     
    //clear out table
    app.post("/api/clear", function() {
        // Empty out the arrays of data
        friends = [];
        console.log(friends);
    });  
};