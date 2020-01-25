/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

SPECIAL RULE:
- If the current player rolls 6 twice in a row, he loses all of his points for both the round and the game and the turn is passed to the other player

ADDITIONAL OPTION:
- Either player can set the winning score for the game to be different than the default score of 100 points by inputting the desired final score in the blank field provided in the center of the screen.

*/


var scores, roundScore, activePlayer, gamePlaying;

init(); 




var diceRecord=[]; //stores the latest two dice rolls for special rules: roll 6 twice in a row and you lose all of your points and the turn is passed to the other player.



document.querySelector('.btn-roll').addEventListener('click', function () { 
    if (gamePlaying) { 
    //1. Random number
    var dice = Math.floor(Math.random()*6) + 1;
    var dice2 = Math.floor(Math.random()*6) + 1; 
    
    //2. Display the result
    var diceDOM =  document.querySelector('.dice');
    var diceDOM2 = document.querySelector('.dice2'); 
    diceDOM.style.display = 'block'; 
    diceDOM2.style.display = 'block'; 
    diceDOM.src = 'dice-' + dice + '.png'; //corresponds visual result with the result of the dice roll from 1. above.
    diceDOM2.src = 'dice-' + dice2 + '.png'; 
    
    
    //3 Update the round score IF the rolled number was NOT a 1
    if (dice !== 1 && dice2 !==1) {
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore; //whoever is the current active player, this takes the roundscore value calculated in line 41 and replaces the text content of the "current" box.
        diceRecord.push(dice); // result here is pushed into the diceRecord array in line 20.
        console.log(diceRecord);
        if(diceRecord.length > 2) { 
            diceRecord.shift();
            console.log(diceRecord);
        };
        if (diceRecord[0]===6 && diceRecord[1]===6) { //this checks the two entries of the dice roll. If they both are 6, the total score for the active player is set to 0, textContent is also set to 0, and finally nextPlayer is run, which also clears the diceRecord array to the empty set.
            scores[activePlayer]=0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
    } else {
        nextPlayer();
    }
        
  }

    
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;
    
    // Update the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if (input) { //this allows the user to set a different score than the default one. If there is no input, i.e. the field is blank, the default is 100 points.
            winningScore=input;
        } else {
            winningScore=100;
        }
        
    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        nextPlayer();
    }
    }
})



function nextPlayer () {
        //next player: this resets the roundScore of the current player to 0, clears the diceRecord array, and toggles the turn from the current player to the inactive player.
        activePlayer === 0 ? activePlayer= 1 : activePlayer= 0; 
        roundScore = 0;
        diceRecord=[];
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0'; //this makes the '0' visible on the user interface.
        
        document.querySelector('.player-0-panel').classList.toggle('active') 
        document.querySelector('.player-1-panel').classList.toggle('active')
        
        
        
        
        document.querySelector('.dice').style.display = 'none'; //this hides the dice again when the current player loses his turn.
        document.querySelector('.dice2').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);


function init() { //the starting conditions of a new game. This hides the dice, sets all scores to zero, and resets the player tags if there was a previously determined winner.
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0'; 
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;

};


