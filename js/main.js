/****Functions****/
//For making a candidate
var makeCandidate = function (name, partyColor) {

    var candidate = {};
    candidate.name = name;
    candidate.electionResults = null;
    candidate.totalVotes = 0;
    candidate.partyColor = partyColor;

    candidate.announce = function() {
        //console.log(candidate.name + ", " + candidate.electionResults + ", " + candidate.totalVotes);
    };

    //method for tallying votes
    candidate.electionResultsTotal = function(){
        
        this.totalVotes = 0;

        for (var i = 0; i < this.electionResults.length; i++) {
            this.totalVotes = this.totalVotes + this.electionResults[i];
            //console.log(this.electionResultsTotal);
        }
    };

    candidate.announce();
    return candidate;
};

//determines the winner in each state
var setStateResults = function(state) {

    theStates[state].winner = null;

    if (johnny.electionResults[state] > martha.electionResults[state]) {
        theStates[state].winner = johnny;
    } else if (martha.electionResults[state] > johnny.electionResults[state]) {
        theStates[state].winner = martha;
    }

    var stateWinner = theStates[state].winner;

    if (theStates[state].winner !== null) {
        theStates[state].rgbColor = stateWinner.partyColor;
    } else {
        theStates[state].rgbColor = [11, 32, 57];
    }

    var statesTable = document.getElementById("stateResults"); //grabs state table
    var header = statesTable.children[0].children[0];
    var stateName = header.children[0];
    stateName.innerText = theStates[state].nameFull;
    var stateAbbrev = header.children[1];
    stateAbbrev.innerText = theStates[state].nameAbbrev;

    //the other three rows
    var statesRow = statesTable.children[1];
    var name1 = statesRow.children[0].children[0];
    name1.innerText = johnny.name;
    var results1 = statesRow.children[0].children[1];
    results1.innerText = johnny.electionResults[state];

    var name2 = statesRow.children[1].children[0];
    name2.innerText = martha.name;
    var results2 = statesRow.children[1].children[1];
    results2.innerText = martha.electionResults[state];

    var winnerName = statesRow.children[2].children[1];

    if (stateWinner !== null) {
        winnerName.innerText = stateWinner.name;
    } else {
        winnerName.innerText ="DRAW";
    }
    
}
/***End Functions***/

/****Variables****/
//candidate variables with names and colors
var johnny = makeCandidate ("Johnny Stone", [132, 17, 11]);
var martha = makeCandidate ("Martha Douglas", [245, 141, 136]);
var winner = null; //for determining the winner with if/else
/***End Variables***/

//voting data
johnny.electionResults = [5,1,7,2,33,6,4,2,1,14,8,3,1,11,11,0,5,3,3,3,7,4,8,9,3,7,2,2,4,2,8,3,15,15,2,12,0,4,13,1,3,2,8,21,3,2,11,1,3,7,2];
martha.electionResults = [4,2,4,4,22,3,3,1,2,15,8,1,3,9,0,6,1,5,5,1,3,7,8,1,3,3,1,3,2,2,6,2,14,0,1,6,7,3,7,3,6,1,3,17,3,1,2,11,2,3,1];

//console.log(johnny.electionResults, martha.electionResults);

//re-counts! updates numbers
johnny.electionResults[9] = 1;
martha.electionResults[9] = 28;

johnny.electionResults[4] = 17;
martha.electionResults[4] = 38;

johnny.electionResults[43] = 11;
martha.electionResults[43] = 27;

//console.log(johnny.electionResults, martha.electionResults, johnny.partyColor, martha.partyColor);

//calling the results methods
johnny.electionResultsTotal();
martha.electionResultsTotal();

//determining the winner
if (johnny.totalVotes < martha.totalVotes) {
    winner = martha.name;
} 
else if (martha.totalVotes < johnny.totalVotes)
{
    winner = johnny.name;
} else {
winner = "DRAW";
}

//console.log(winner);

var countryTable = document.getElementById("countryResults"); //grabs country table
var row = countryTable.children[0].children[0];

//populates the country table
row.children[0].innerText = johnny.name;
row.children[1].innerText = johnny.totalVotes;
row.children[2].innerText = martha.name;
row.children[3].innerText = martha.totalVotes;
row.children[5].innerText = winner;