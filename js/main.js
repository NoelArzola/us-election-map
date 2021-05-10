/****Functions****/
//For making a candidate
const makeCandidate = function (name, partyColor) {
  const candidate = {};
  candidate.name = name;
  candidate.electionResults = null;
  candidate.totalVotes = 0;
  candidate.partyColor = partyColor;

  candidate.announce = function () {
    //console.log(candidate.name + ", " + candidate.electionResults + ", " + candidate.totalVotes);
  };

  //method for tallying votes
  candidate.electionResultsTotal = function () {
    this.totalVotes = 0;

    for (let i = 0; i < this.electionResults.length; i++) {
      this.totalVotes = this.totalVotes + this.electionResults[i];
      //console.log(this.electionResultsTotal);
    }
  };

  candidate.announce();
  return candidate;
};

//determines the winner in each state
const setStateResults = function (state) {
  theStates[state].winner = null;

  if (angela.electionResults[state] > pam.electionResults[state]) {
    theStates[state].winner = angela;
  } else if (pam.electionResults[state] > angela.electionResults[state]) {
    theStates[state].winner = pam;
  }

  const stateWinner = theStates[state].winner;

  if (theStates[state].winner !== null) {
    theStates[state].rgbColor = stateWinner.partyColor;
  } else {
    theStates[state].rgbColor = [11, 32, 57];
  }

  const statesTable = document.getElementById("stateResults"); //grabs state table
  const header = statesTable.children[0].children[0];
  const stateName = header.children[0];
  stateName.innerText = theStates[state].nameFull;
  const stateAbbrev = header.children[1];
  stateAbbrev.innerText = theStates[state].nameAbbrev;

  //the other three rows
  const statesRow = statesTable.children[1];
  const name1 = statesRow.children[0].children[0];
  name1.innerText = angela.name;
  const results1 = statesRow.children[0].children[1];
  results1.innerText = angela.electionResults[state];

  const name2 = statesRow.children[1].children[0];
  name2.innerText = pam.name;
  const results2 = statesRow.children[1].children[1];
  results2.innerText = pam.electionResults[state];

  const winnerName = statesRow.children[2].children[1];

  if (stateWinner !== null) {
    winnerName.innerText = stateWinner.name;
  } else {
    winnerName.innerText = "DRAW";
  }
};
/***End Functions***/

/****Variables****/
//candidate variables with names and colors
const angela = makeCandidate("Angela Martin", [132, 17, 11]);
const pam = makeCandidate("Pam Beesley", [245, 141, 136]);
let winner = null; //for determining the winner with if/else
/***End Variables***/

//voting data
angela.electionResults = [
  5,
  1,
  7,
  2,
  33,
  6,
  4,
  2,
  1,
  14,
  8,
  3,
  1,
  11,
  11,
  0,
  5,
  3,
  3,
  3,
  7,
  4,
  8,
  9,
  3,
  7,
  2,
  2,
  4,
  2,
  8,
  3,
  15,
  15,
  2,
  12,
  0,
  4,
  13,
  1,
  3,
  2,
  8,
  21,
  3,
  2,
  11,
  1,
  3,
  7,
  2,
];
pam.electionResults = [
  4,
  2,
  4,
  4,
  22,
  3,
  3,
  1,
  2,
  15,
  8,
  1,
  3,
  9,
  0,
  6,
  1,
  5,
  5,
  1,
  3,
  7,
  8,
  1,
  3,
  3,
  1,
  3,
  2,
  2,
  6,
  2,
  14,
  0,
  1,
  6,
  7,
  3,
  7,
  3,
  6,
  1,
  3,
  17,
  3,
  1,
  2,
  11,
  2,
  3,
  1,
];

//console.log(angela.electionResults, pam.electionResults);

//re-counts! updates numbers
angela.electionResults[9] = 1;
pam.electionResults[9] = 28;

angela.electionResults[4] = 17;
pam.electionResults[4] = 38;

angela.electionResults[43] = 11;
pam.electionResults[43] = 27;

//console.log(angela.electionResults, pam.electionResults, angela.partyColor, pam.partyColor);

//calling the results methods
angela.electionResultsTotal();
pam.electionResultsTotal();

//determining the winner
if (angela.totalVotes < pam.totalVotes) {
  winner = pam.name;
} else if (pam.totalVotes < angela.totalVotes) {
  winner = angela.name;
} else {
  winner = "DRAW";
}

//console.log(winner);

const countryTable = document.getElementById("countryResults"); //grabs country table
const row = countryTable.children[0].children[0];

//populates the country table
row.children[0].innerText = angela.name;
row.children[1].innerText = angela.totalVotes;
row.children[2].innerText = pam.name;
row.children[3].innerText = pam.totalVotes;
row.children[5].innerText = winner;
