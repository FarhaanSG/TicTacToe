var players = [];
var whoseTurn = 0;
players[0] = "X's Turn";
players[1] = "O's Turn";
document.getElementsByClassName('playerTurn')[0].innerHTML = players[whoseTurn];

var winCombinations =  [[0, 1, 2],
                        [3, 4, 5],
                        [6, 7, 8],
                        [0, 3, 6],
                        [1, 4, 7],
                        [2, 5, 8],
                        [0, 4, 8],
                        [2, 4, 6]];

var playerOne = []; // created array to store button clicks of player one
var playerTwo = [];
var gameOver = false;

$("#table").on("click", "td", function() {
  if (gameOver == false) {
    if (!this.classList.contains('X') && !this.classList.contains('O')) { // if td doesnt hvae an x or o continue with loop
      if (whoseTurn == 0) { // if whose turn is = o its x turn
        // alert($( this ).data('num'));
        $( this ).addClass('X'); // call add class function from css
        $( this ).html('X'); // replaces the box with the X
        whoseTurn = 1;
        document.getElementsByClassName('playerTurn')[0].innerHTML = players[whoseTurn]; // changes the h2 into the player turn
        playerOne.push(parseInt(this.dataset.num)) ; // push the square clicked in the var array for player one and converts it to a integer
        if(checkWinner(playerOne)){
          setTimeout(alert, 200, "Player 1 Won");
          gameOver = true;
        }
        else if (playerOne.length + playerTwo.length == 9) {
          setTimeout(alert, 200, "Draw");
          gameOver = true;
        }
      }
      else {
        // alert($( this ).data('num'));
        $( this ).addClass('O');
        $( this ).html('O');
        whoseTurn = 0;
        document.getElementsByClassName('playerTurn')[0].innerHTML = players[whoseTurn];
        playerTwo.push(parseInt(this.dataset.num));
        if(checkWinner(playerTwo)){
          setTimeout(alert, 200, "Player 2 Won");
          gameOver = true;
        }
      }
    }
  }
});

function checkWinner(player){
  for (var i = 0; i < winCombinations.length; i++) { // check the win condition array by row
    var numberMatched = 0;
    for (var j = 0; j < winCombinations[i].length; j++) { // check the win condition array by row and column
      if (player.includes(winCombinations[i][j])) { // if the box player one selected includes the number picked from the win array
        numberMatched ++; // increments the value by one
      }
    }
    if (numberMatched == 3){
      return true;
    }
  }
  return false;
}

var resetBtn = document.getElementById('reset'); // select all buttons with class my button
resetBtn.addEventListener('click', function(){ // when button is clicked it display button value via the log below.
  whoseTurn = 0;
  $("#table td").attr("class", "");
  $("#table td").html("");
  // console.log(resetBtn);
  document.getElementsByClassName('playerTurn')[0].innerHTML = players[0];
  playerOne = [];
  playerTwo = [];
  gameOver = false;
});
